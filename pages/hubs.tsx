import prisma from 'lib/prisma';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { HubSize } from 'lib/HubSize';
import Link from 'next/link';

const Hubs = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const sorted = [...data].sort(
    (a, b) => HubSize(a.hubType) - HubSize(b.hubType),
  );

  return (
    <main className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
      {sorted
        .sort(
          (a, b) =>
            HubSize(a.hubType) - HubSize(b.hubType) ||
            (a.name > b.name ? 1 : -1),
        )
        .map(({ code, name, xCord, yCord, cities, hubType, link, copy }) => (
          <div key={code}>
            <h1 className="text-3xl font-thin">
              {name} ({code})
            </h1>
            <div
              className={`mb-2 w-full border-t ${
                hubType === 'Main'
                  ? 'border-aurora-pink'
                  : hubType === 'Secondary'
                  ? 'border-aurora-purple'
                  : hubType === 'Other'
                  ? 'border-aurora-deep-blue'
                  : 'border-aurora-blue'
              }`}
            >
              <h2 className="mt-1 font-mono">
                ({xCord}, {yCord})
              </h2>
              <h2>
                <b>Cit{cities.length === 1 ? 'y' : 'ies'}: </b>
                {cities.length === 1
                  ? cities[0]?.name
                  : cities.map(({ name }, e, array) =>
                      array.length === e + 1 ? name : `${name}, `,
                    )}
              </h2>
              <h2>
                <b>Type: </b>
                {hubType}
              </h2>
              <Link href={link}>
                <a className="underline hover:text-aurora-teal">Wiki</a>
              </Link>
              <h1> </h1>
              <Link href={`/airport/${code}`}>
                <a className="underline hover:text-aurora-teal">Flights</a>
              </Link>
              <p>{copy}</p>
            </div>
          </div>
        ))}
    </main>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await prisma.airport.findMany({
    where: {
      NOT: [{ hubType: { equals: 'NonHub' } }],
    },
    select: {
      code: true,
      cities: true,
      name: true,
      xCord: true,
      yCord: true,
      hubType: true,
      gates: true,
      copy: true,
      link: true,
    },
  });

  return { props: { data } };
};

export default Hubs;
