import { HubType } from '.prisma/client';

export const HubSize = (value: HubType) => size[value] ?? 3;

export const HubColor = (value: HubType) =>
  hubBackgroundColor[value] ?? 'bg-black';

export const HubBorderColor = (value: HubType) =>
  hubBorderColor[value] ?? 'border-black';

const hubBorderColor = {
  Main: 'border-aurora-pink',
  Secondary: 'border-aurora-purple',
  Other: 'border-aurora-deep-blue',
  NonHub: 'border-aurora-blue',
};

const hubBackgroundColor = {
  Main: 'bg-aurora-pink',
  Secondary: 'bg-aurora-purple',
  Other: 'bg-aurora-deep-blue',
  NonHub: 'bg-aurora-blue',
};

const size = {
  Main: 0,
  Secondary: 1,
  Other: 2,
  NonHub: 3,
};
