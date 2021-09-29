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
  const alignText = align === 'LEFT' ? 'text-left' : 'text-right';

  return (
    <div className="w-1/6 cursor-pointer">
      <Link href={`/airport/${gate.airport.code}`}>
        <div>
          <h1 className={`text-4xl font-thin ${alignText} text-gray-500 m-0.5`}>
            {gate.airport.code}
          </h1>
          <h1
            className={`font-semibold ${alignText}`}
          >{`Gate ${gate.name}`}</h1>
          <h1 className={`font-mono text-xs ${alignText}`}>
            {gate.airport.name}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default FlightCardGate;
