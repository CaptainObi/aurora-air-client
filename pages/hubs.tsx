import prisma from 'lib/prisma';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { HubBorderColor, HubSize } from 'lib/HubSize';
import Head from 'next/head';
import HubInfo from 'components/Utility/HubInfo';

const Hubs = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const sorted = [...data].sort(
    (a, b) => HubSize(a.hubType) - HubSize(b.hubType),
  );

  return (
    <div>
      <Head>
        <title>Hubs</title>
      </Head>
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
              <h1 className="bg-aurora-pink"></h1>
              <div
                className={`mb-2 w-full border-t-2 ${HubBorderColor(hubType)}`}
              >
                <HubInfo
                  {...{ code, name, xCord, yCord, cities, hubType, link, copy }}
                  showCords
                  showFlights
                />
              </div>
            </div>
          ))}
      </main>
    </div>
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
