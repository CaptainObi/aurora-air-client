import { extendType, objectType } from 'nexus';
import { Gate } from './Gate';
import { Plane } from './Plane';

export const Flight = objectType({
  name: 'flight',
  definition(t) {
    t.int('number');
    t.field('plane', {
      type: Plane,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.flight
          .findUnique({ where: { number: _parent.number } })
          .plane();
      },
    });
    t.int('plane_id');
    t.list.field('gates', {
      type: Gate,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.flight
          .findUnique({ where: { number: _parent.number } })
          .gates();
      },
    });
  },
});

export const FlightsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('flights', {
      type: Flight,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.flight.findMany();
      },
    });
  },
});
