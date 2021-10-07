import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import Cors from 'micro-cors';
import { createContext } from '../../graphql/context';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

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
  resolvers,
  context: createContext,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

// export default async function handler(req, res) {
//   await startServer;
//   await apolloServer.createHandler({
//     path: '/api/graphql',
//   })(req, res);
// }

export const config = {
  api: {
    bodyParser: false,
  },
};
