import { extendType, intArg, objectType } from 'nexus';
import { Airport } from './Airport';

export const City = objectType({
  name: 'city',
  definition(t) {
    t.int('id');
    t.string('name');
    t.list.field('airports', {
      type: Airport,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.city
          .findUnique({ where: { id: _parent.id } })
          .airports();
      },
    });
  },
});

export const CitesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('cities', {
      args: { take: intArg(), skip: intArg() },
      type: City,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.city.findMany({
          take: _args.take || undefined,
          skip: _args.skip || undefined,
        });
      },
    });
  },
});
