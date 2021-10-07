import prisma from '../lib/prisma';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { HubBorderColor, HubSize } from '../lib/HubSize';
import Link from 'next/link';

const Hubs = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const sorted = [...data].sort(
    (a, b) => HubSize(a.hubType) - HubSize(b.hubType),
  );

  return (
    <main className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
      {sorted.map((s) => (
        <div>
          <h1 className="text-3xl font-thin">
            {s.name} ({s.code})
          </h1>
          <div className={`mb-2 w-full border-t ${HubBorderColor(s.hubType)}`}>
            <h2 className="mt-1 font-mono">
              ({s.xCord}, {s.yCord})
            </h2>
            <h2>
              <b>Cit{s.cities.length === 1 ? 'y' : 'ies'}: </b>
              {s.cities.length === 1
                ? s.cities[0]?.name
                : s.cities.map(({ name }, e, array) =>
                    array.length === e + 1 ? name : `${name}, `,
                  )}
            </h2>
            <h2>
              <b>Type: </b>
              {s.hubType}
            </h2>
            <Link href={s.link}>
              <a className="underline hover:text-aurora-teal">Wiki</a>
            </Link>
            <h1> </h1>
            <Link href={`/airport/${s.code}`}>
              <a className="underline hover:text-aurora-teal">Flights</a>
            </Link>
            <p>{s.copy}</p>
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
