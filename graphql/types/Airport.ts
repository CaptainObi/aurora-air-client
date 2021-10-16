import { enumType, extendType, intArg, objectType, stringArg } from 'nexus';
import { City } from './City';
import { Gate } from './Gate';

export const Airport = objectType({
  name: 'airport',
  definition(t) {
    t.int('id');
    t.string('code');
    t.list.field('cities', {
      type: City,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.airport
          .findUnique({ where: { id: _parent.id } })
          .cities();
      },
    });
    t.string('name');
    t.string('link');
    t.int('xCord');
    t.int('yCord');
    t.list.field('gates', {
      type: Gate,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.airport
          .findUnique({ where: { id: _parent.id } })
          .gates();
      },
    });
    t.string('copy');
    t.field('hubType', { type: HubType });
  },
});

const HubType = enumType({
  name: 'HubType',
  members: ['Main', 'Secondary', 'Other', 'NonHub'],
});

export const AirportsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('airports', {
      args: { take: intArg(), skip: intArg() },
      type: Airport,
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.airport.findMany({
          take: _args.take || undefined,
          skip: _args.skip || undefined,
        });
      },
    });
  },
});

export const QueryAirportByCode = extendType({
  type: 'Query',
  definition(t) {
    t.field('airportByCode', {
      type: Airport,
      args: { code: stringArg() },
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.airport.findUnique({ where: { code: _args.code } });
      },
    });
  },
});
