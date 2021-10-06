import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { HubSize } from '../components/functions/HubSize';
import FlightCards from '../components/FlightCard/FlightCards';
import prisma from '../lib/prisma';

const Flights = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <FlightCards
        flights={data.filter(
          (value, index, self) =>
            self.map(({ number }) => number).indexOf(value.number) === index,
        )}
        sort={(a, b) => {
          const aSize = Math.min(
            HubSize(a.gates[0].airport.hubType),
            HubSize(a.gates[1].airport.hubType),
          );

          const bSize = Math.min(
            HubSize(b.gates[0].airport.hubType),
            HubSize(b.gates[1].airport.hubType),
          );

          if (aSize > bSize) return 1;
          else if (aSize < bSize) return -1;
          else {
            const aName =
              a.gates[0].airport.name > a.gates[1].airport.name
                ? a.gates[0].airport.name
                : a.gates[1].airport.name;

            const bName =
              b.gates[0].airport.name > b.gates[1].airport.name
                ? b.gates[0].airport.name
                : b.gates[1].airport.name;

            return aName > bName ? 1 : aName < bName ? -1 : 0;
          }
        }}
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
