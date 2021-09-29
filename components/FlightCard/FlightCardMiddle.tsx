import { Plane, Size } from '.prisma/client';

interface Props {
  number: number;
  size: Size;
  plane: Plane;
}

const FlightCardMiddle = ({ number, plane, size }: Props) => {
  return (
    <div className="self-center flex-grow text-center">
      <h1 className="m-1 text-lg font-semibold">{`AA ${number}`}</h1>
      <img
        className="m-1 ml-auto mr-auto text-gray-500 rotate-90 cursor-pointer"
        src="/airplane.svg"
        width="25"
        height="25"
      />
      <h1 className="m-1">{`${plane.name} (${size})`}</h1>
    </div>
  );
};

export default FlightCardMiddle;
