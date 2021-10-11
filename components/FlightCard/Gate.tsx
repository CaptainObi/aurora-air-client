import { Airport } from '.prisma/client';
import Link from 'next/link';

interface Props {
  gate: {
    airport: Airport;
    name: string;
  };
  align: 'RIGHT' | 'LEFT';
}

const FlightCardGate = ({ gate, align }: Props) => {
  const alignText = align === 'LEFT' ? 'md:text-left' : 'md:text-right';

  return (
    <div
      className={`md:w-1/6 w-1/2 ${
        align === 'LEFT' && 'border-b-2 md:border-0'
      } cursor-pointer`}
    >
      <Link href={`/airport/${gate.airport.code}`} passHref>
        <div className="hover:text-aurora-purple">
          <h1
            className={`text-4xl font-thin ${alignText} text-gray-500 hover:text-aurora-purple m-0.5`}
          >
            {gate.airport.code}
          </h1>
          <h1 className={`font-semibold ${alignText}`}>Gate {gate.name}</h1>
        </div>
      </Link>
      <h1 className={`font-mono text-xs ${alignText}`}>
        <Link href={`/airport/${gate.airport.code}`}>
          <a className="hover:text-aurora-pink">
            <i>{gate.airport.name}</i>
          </a>
        </Link>
        {gate.airport.link && (
          <Link href={gate.airport.link}>
            <a className="hover:text-aurora-teal"> (wiki)</a>
          </Link>
        )}
      </h1>
    </div>
  );
};

export default FlightCardGate;
