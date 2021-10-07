import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/schema';
import Cors from 'micro-cors';
import { createContext } from '../../graphql/context';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
  origin: '*',
  allowHeaders: [
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'X-HTTP-Method-Override',
    'Content-Type',
    'Authorization',
    'Accept',
  ],
});

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
