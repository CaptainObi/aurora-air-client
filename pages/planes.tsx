import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import prisma from '../lib/prisma';
import Image from 'next/image';
import { GateSize } from '../lib/Size';

const Planes = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
      {data
        .sort(
          (a, b) =>
            GateSize(a.size) - GateSize(b.size) || (a.name > b.name ? 1 : -1),
        )
        .map((plane) => (
          <div key={plane.name}>
            <h1 className="text-3xl font-thin">{plane.name}</h1>
            <div className="w-full mb-2 border-t">
              <h2 className="mt-1 font-mono">
                {plane.length}l, {plane.width}w
              </h2>
              <h2>
                <b>Used On: </b>
                {plane.flights.length} flights
              </h2>
              <h2>
                <b>Size: </b>
                {plane.size}
              </h2>
              <div className="relative w-full h-full">
                {/* {plane.image && (
                <Image src={plane.image} layout="fill" objectFit="contain" />
              )} */}
              </div>
              <p>{plane.copy}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await prisma.plane.findMany({
    select: {
      name: true,
      image: true,
      flights: true,
      width: true,
      length: true,
      copy: true,
      size: true,
    },
  });

  return { props: { data }, revalidate: 100 };
};

export default Planes;
