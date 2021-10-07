import { Size } from '.prisma/client';

export const GateSize = (value: Size) => size[value] ?? 1;

const size = {
  XS: 0,
  S: 1,
  MS: 2,
  M: 3,
};
