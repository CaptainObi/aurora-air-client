import { objectType, extendType, enumType, intArg } from 'nexus';
import { Flight } from './Flight';

export const Plane = objectType({
  name: 'plane',
  definition(t) {
    t.int('id');
    t.string('name');
    t.list.field('flights', {
      type: Flight,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.plane
          .findUnique({ where: { id: _parent.id } })
          .flights();
      },
    });
    t.string('image');
    t.int('width');
    t.int('length');
    t.string('copy');
    t.field('size', { type: Size });
  },
});

export const Size = enumType({ name: 'Size', members: ['XS', 'S', 'MS', 'M'] });

export const PlanesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('planes', {
      args: { take: intArg(), skip: intArg() },
      type: Plane,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.plane.findMany({
          take: _args.take || undefined,
          skip: _args.skip || undefined,
        });
      },
    });
  },
});
