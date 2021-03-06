import FlightCard, { FlightCardProps, Side } from './FlightCard';
import Fuse from 'fuse.js';
import { useState } from 'react';
import Search from '../Utility/Search';
import Select from 'react-select';
import { City, HubType } from '.prisma/client';
import HubInfo from 'components/Utility/HubInfo';
interface Props {
  flights: FlightCardProps[];
  side?: Side | null;
  sort: (a: FlightCardProps, b: FlightCardProps) => number;
  airport?: {
    xCord: number;
    yCord: number;
    copy?: string;
    hubType: HubType;
    link?: string;
    cities: City[];
  };
}

const FlightCards = ({ side, flights, sort, airport }: Props) => {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('All');

  const handleSearch = (value: string) => setSearch(value);

  const fuse = new Fuse(flights, {
    includeScore: true,
    findAllMatches: true,
    threshold: 0.25,
    keys: [
      'gates.airport.code',
      'gates.airport.city',
      'gates.airport.name',
      'gates.name',
    ],
  });

  const sortFlights = () => {
    let searched = search
      ? fuse.search(search).map((e) => e.item)
      : [...flights];
    searched.sort(sort);

    const filtered =
      size !== 'All'
        ? searched.filter((e) => e.gates[0].size === size)
        : searched;
    return filtered;
  };
  const options = [
    { value: 'XS', label: 'Extra Small' },
    { value: 'S', label: 'Small' },
    { value: 'MS', label: 'Medium-Small' },
    { value: 'M', label: 'Medium' },
    { value: 'All', label: 'All' },
  ];

  return (
    <div className="flex flex-col w-5/6 p-2 ml-auto mr-auto rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row">
        <Search search={search} onSearch={handleSearch} />
        <Select
          onChange={(e) => setSize(e.value)}
          defaultValue={{ value: 'All', label: 'All' }}
          options={options}
          className="w-full mb-2 md:mb-0 md:w-1/4 md:ml-2"
        />
      </div>
      {airport && (
        <div className="w-full p-2 rounded-md shadow-md md:w-1/4">
          <HubInfo {...airport} />
        </div>
      )}
      <div className="py-2">
        {sortFlights().map((e) => (
          <FlightCard key={e.number} flight={e} side={side} />
        ))}
      </div>
    </div>
  );
};

export default FlightCards;
