import { City, HubType } from '.prisma/client';
import Link from 'next/link';

interface Props {
  xCord?: number;
  yCord?: number;
  cities: City[];
  hubType: HubType;
  link?: string;
  code?: string;
  copy?: string;
  showFlights?: boolean;
  showCords?: boolean;
}

const HubInfo = ({
  showCords,
  copy,
  code,
  link,
  xCord,
  yCord,
  cities,
  hubType,
  showFlights,
}: Props) => {
  return (
    <>
      {showCords && (
        <h2 className="mt-1 font-mono">
          ({xCord}, {yCord})
        </h2>
      )}
      <h2>
        <b>Cit{cities.length === 1 ? 'y' : 'ies'}: </b>
        {cities.length === 1
          ? cities[0]?.name
          : cities.map(({ name }, e, array) =>
              array.length === e + 1 ? name : `${name}, `,
            )}
      </h2>
      <h2>
        <b>Type: </b>
        {hubType === 'NonHub' ? 'Not a hub' : hubType}
      </h2>
      {link && (
        <Link href={link}>
          <a className="underline hover:text-aurora-teal">Wiki</a>
        </Link>
      )}
      {showFlights && (
        <>
          <h1> </h1>
          <Link href={`/airport/${code}`}>
            <a className="underline hover:text-aurora-teal">Flights</a>
          </Link>
        </>
      )}
      {copy && <p>{copy}</p>}
    </>
  );
};

export default HubInfo;
