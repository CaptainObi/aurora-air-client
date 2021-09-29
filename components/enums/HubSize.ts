import { HubType } from '.prisma/client';

export enum HubSize {
  Main = 0,
  Secondary = 1,
  Other = 2,
  NonHub = 3,
}

export const HubColor = (value: HubType) => {
  switch (value) {
    case HubType.Main:
      return 'bg-aurora-pink';
    case HubType.Secondary:
      return 'bg-aurora-purple';
    case HubType.Other:
      return 'bg-aurora-deep-blue';
    case HubType.NonHub:
      return 'bg-aurora-blue';
    default:
      return '';
  }
};
