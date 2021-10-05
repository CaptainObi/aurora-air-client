import { HubType } from '.prisma/client';

export const HubSize = (value: HubType) => {
  const size = {
    Main: 0,
    Secondary: 1,
    Other: 2,
    NonHub: 3,
  };

  return size[value] ?? 3;
};

export const HubColor = (value: HubType) => {
  const color = {
    Main: 'bg-aurora-pink',
    Secondary: 'bg-aurora-purple',
    Other: 'bg-aurora-deep-blue',
    NonHub: 'bg-aurora-blue',
  };

  return color[value] ?? 'bg-black';
};

export const HubBorderColor = (value: HubType) => {
  const color = {
    Main: 'border-aurora-pink',
    Secondary: 'border-aurora-purple',
    Other: 'border-aurora-deep-blue',
    NonHub: 'border-aurora-blue',
  };

  return color[value] ?? 'border-black';
};
