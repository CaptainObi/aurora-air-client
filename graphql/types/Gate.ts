import { Size } from './Plane';
import { extendType, intArg, objectType } from 'nexus';
import { Airport } from './Airport';
import { Flight } from './Flight';

export const Gate = objectType({
  name: 'gate',
  definition(t) {
    t.int('id');
    t.string('name');
    t.field('airport', {
      type: Airport,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.gate
          .findUnique({ where: { id: _parent.id } })
          .airport();
      },
    });
    t.int('airport_id');
    t.field('size', { type: Size });
    t.list.field('flights', {
      type: Flight,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.gate
          .findUnique({ where: { id: _parent.id } })
          .flights();
      },
    });
  },
});

export const GatesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('gates', {
      args: { take: intArg(), skip: intArg() },
      type: Gate,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.gate.findMany({
          take: _args.take || undefined,
          skip: _args.skip || undefined,
        });
      },
    });
  },
});
