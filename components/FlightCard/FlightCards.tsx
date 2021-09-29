import FlightCard, { FlightCardProps, Side } from './FlightCard';
import Fuse from 'fuse.js';
import { useState } from 'react';
import Search from '../Search';
import Select from 'react-select';
import { Size } from '.prisma/client';

interface Props {
  flights: FlightCardProps[];
  side: Side | null;
  sort: (a: FlightCardProps, b: FlightCardProps) => number;
}

const FlightCards = ({ side, flights, sort }: Props) => {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('');

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

    const filtered = size
      ? searched.filter((e) => e.gates[0].size === size)
      : searched;
    return filtered;
  };
  const options = [
    { value: 'XS', label: 'Extra Small' },
    { value: 'S', label: 'Small' },
    { value: 'MS', label: 'Medium-Small' },
    { value: 'M', label: 'Medium' },
  ];

  return (
    <div className="flex flex-col w-5/6 p-2 ml-auto mr-auto rounded-lg shadow-md">
      <div className="flex">
        <Search search={search} onSearch={handleSearch} />
        <Select onChange={(e) => setSize(e.value)} options={options} />
      </div>
      {sortFlights().map((e) => (
        <FlightCard key={e.number} flight={e} side={side} />
      ))}
    </div>
  );
};

export default FlightCards;
