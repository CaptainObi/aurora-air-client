import { PrismaClient } from '@prisma/client';
import { ContextFunction } from 'apollo-server-core';
import prisma from 'lib/prisma';

export type Context = {
  prisma: PrismaClient;
};
export const createContext: ContextFunction = ({ req, res }) => {
  return {
    prisma,
  };
};
