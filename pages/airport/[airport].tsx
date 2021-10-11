import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import prisma from 'lib/prisma';
import FlightCards from 'components/FlightCard/FlightCards';
import Head from 'next/head';

const Airport = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>{data.code} Flights</title>
      </Head>
      <FlightCards
        airport={{
          xCord: data.xCord,
          yCord: data.yCord,
          hubType: data.hubType,
          cities: data.cities,
          copy: data.copy,
          link: data.link,
        }}
        flights={data.gates.flatMap(({ flights }) => flights)}
        sort={(a, b) => a.number - b.number}
        side={{ code: data.code, direction: 'RIGHT' }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await prisma.airport.findMany()).map(({ code }) => ({
    params: { airport: code },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await prisma.airport.findUnique({
    where: { code: String(context.params.airport) },
    select: {
      code: true,
      cities: true,
      name: true,
      xCord: true,
      yCord: true,
      hubType: true,
      link: true,
      copy: true,
      gates: {
        select: {
          name: true,
          size: true,
          flights: {
            select: {
              number: true,
              plane: true,
              gates: {
                select: {
                  airport: true,
                  name: true,
                  size: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    props: {
      data,
    },
    revalidate: 100,
  };
};

export default Airport;
