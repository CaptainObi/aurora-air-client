import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { HubSize } from 'lib/HubSize';
import FlightCards from 'components/FlightCard/FlightCards';
import prisma from 'lib/prisma';

const Flights = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <FlightCards
        flights={data.filter(
          (value, index, self) =>
            self.map(({ number }) => number).indexOf(value.number) === index,
        )}
        sort={(a, b) => a.number - b.number}
      />
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
