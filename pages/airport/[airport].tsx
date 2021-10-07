import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import prisma from 'lib/prisma';
import FlightCards from 'components/FlightCard/FlightCards';

const Airport = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <FlightCards
        flights={data.gates.flatMap(({ flights }) => flights)}
        sort={(a, b) => {
          const aGate = a.gates.find((e) => e.airport.code === data.code);
          const bGate = b.gates.find((e) => e.airport.code === data.code);
          return aGate.size > aGate.size
            ? 1
            : aGate.size === bGate.size
            ? 0
            : -1 || aGate.name > bGate.name
            ? 1
            : aGate.name === bGate.name
            ? 0
            : -1;
        }}
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
