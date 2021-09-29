import prisma from '../lib/prisma';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import * as d3 from 'd3';

const Map = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>Enter</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
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

  return { props: { data }, revalidate: 3600 };
};

export default Map;
