import { HubType } from '.prisma/client';
import { HubColor } from 'lib/HubSize';

interface Props {
  hubType: HubType;
}

const HubColorRect = ({ hubType }: Props) => {
  return <div className={`md:w-3 ${HubColor(hubType)}`}>&nbsp;</div>;
};

export default HubColorRect;
