import { Airport, Plane, Size } from '.prisma/client';
import { HubColor, HubSize } from '../functions/HubSize';
import FlightCardGate from './FlightCardGate';
import FlightCardMiddle from './FlightCardMiddle';

export interface FlightCardProps {
  number: number;
  gates: FlightCardGateInterface[];
  plane: Plane;
}

interface FlightCardGateInterface {
  airport: Airport;
  name: string;
  size: Size;
}

interface Props {
  side: Side | null;
  flight: FlightCardProps;
}

export interface Side {
  code: string;
  direction: 'RIGHT' | 'LEFT';
}

const FlightCard = ({ flight, side }: Props) => {
  const sortGates = (gates: FlightCardGateInterface[]) => {
    const result: {
      right: FlightCardGateInterface;
      left: FlightCardGateInterface;
    } = { left: gates[0], right: gates[1] };

    if (side?.direction === 'RIGHT') {
      result.left = gates.find((e) => e.airport.code === side.code);
      result.right = gates.find((e) => e.airport.code !== side.code);
    } else if (side?.direction === 'LEFT') {
      result.left = gates.find((e) => e.airport.code !== side.code);
      result.right = gates.find((e) => e.airport.code === side.code);
    } else {
      const a = HubSize(gates[0].airport.hubType);
      const b = HubSize(gates[1].airport.hubType);

      if (a > b) {
        result.left = gates[1];
        result.right = gates[0];
      } else if (a < b) {
        result.left = gates[0];
        result.right = gates[1];
      } else {
        const sorted = [...gates].sort((a, b) =>
          a.airport.name > b.airport.name
            ? 1
            : a.airport.name < b.airport.name
            ? -1
            : 0,
        );

        result.left = sorted[0];
        result.right = sorted[1];
      }
    }

    return result;
  };

  const sortedGates = sortGates(flight.gates);

  return (
    <div className="w-full p-0.5 border-t border-b flex border-gray-300 flex-col md:flex-row">
      <div className={`md:w-1.5 ${HubColor(sortedGates.left.airport.hubType)}`}>
        &nbsp;
      </div>
      <div className="grid items-center w-full grid-cols-2 p-1 md:flex md:flex-row md:grid-cols-none">
        <FlightCardGate gate={sortedGates.left} align="LEFT" />
        <FlightCardMiddle
          plane={flight.plane}
          number={flight.number}
          size={sortedGates.left.size}
        />
        <FlightCardGate gate={sortedGates.right} align="RIGHT" />
      </div>
      <div
        className={`md:w-1.5 bg-gradient-to-b ${HubColor(
          sortedGates.right.airport.hubType,
        )}`}
      >
        &nbsp;
      </div>
    </div>
  );
};

export default FlightCard;
