import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import FlightCards from 'components/FlightCard/FlightCards';
import prisma from 'lib/prisma';
import Head from 'next/head';

const Flights = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>Flights</title>
      </Head>
      <div>
        <FlightCards
          junk={}
          flights={data.filter(
            (value, index, self) =>
              self.map(({ number }) => number).indexOf(value.number) === index,
          )}
          sort={(a, b) => a.number - b.number}
        />
      </div>
    </div>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await prisma.flight.findMany({
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
  });

  return { props: { data }, revalidate: 100 };
};

export default Flights;
