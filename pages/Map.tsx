import prisma from 'lib/prisma';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';
import { selectAll, select } from 'd3-selection';
import { geoMercator, geoPath } from 'd3-geo';

// const Map = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
//   useEffect(() => {
//     if (data) {
//       const { flights } = data;
//       const airports = data.airports.map((e) => ({
//         ...e,
//         flights: [],
//       }));
//       const el = select('body');
//       const width = 750;
//       const height = 750;

//       const projection = geoMercator().scale(20);

//       const tooltip = select('text#tooltip');

//       const path = geoPath(); //.projection(projection);

//       const map = el.append('svg').attr('width', width).attr('height', height);

//       map
//         .append('image')
//         .attr(
//           'xlink:href',
//           'https://wiki.minecartrapidtransit.net/images/e/e6/MRT_Zeta_map_blank_with_Zeta_borders_August_2021.png',
//         )
//         .attr('width', width)
//         .attr('height', height);

//       const flightsD3 = map
//         .selectAll('.flight')
//         .data(flights)
//         .enter()
//         .append('path')
//         .attr('d', (d) => {
//           const airportA = d.gates[0].airport;
//           const airportB = d.gates[1].airport;

//           const airportACoords = [
//             (width / 60000) * (30000 + airportA.xCord),
//             (height / 60000) * (30000 + airportA.yCord),
//           ];
//           const airportBCoords = [
//             (width / 60000) * (30000 + airportB.xCord),
//             (width / 60000) * (30000 + airportB.yCord),
//           ];

//           console.log(
//             path({
//               type: 'LineString',
//               coordinates: [airportACoords, airportBCoords],
//             }),
//           );

//           return path({
//             type: 'LineString',
//             coordinates: [airportACoords, airportBCoords],
//           });
//         })
//         .style('stroke', 'orange')
//         .style('stroke-width', 2)
//         .each(function (d) {
//           const filteredAirports = airports.filter(
//             (e) =>
//               e.code === d.gates[0].airport.code ||
//               e.code === d.gates[1].airport.code,
//           );

//           filteredAirports.forEach((e) => e.flights.push(select(this))); // HACK this needs improvement, i made a change here but you might want to change it back --obi
//         });

//       const airportD3 = map
//         .selectAll('.airport')
//         .data(airports)
//         .enter()
//         .append('circle')
//         .attr('class', 'airport')
//         .attr('r', 5)
//         .attr('cx', (d) => (width / 60000) * (d.xCord + 30000))
//         .attr('cy', (d) => (height / 60000) * (d.yCord + 30000))
//         .on('mouseover', function (e, d) {
//           console.log(selectAll(d.flights));
//           selectAll(d.flights).style('stroke', 'blue'); // FIXME AAAAH THIS IS THE BANE OF MY EXISTENCE HALP -- obi

//           // tooltip.style('display', null);
//           // tooltip.style('visibility', 'hidden');

//           // set default tooltip positioning
//           // tooltip.attr('text-anchor', 'middle');
//           // tooltip.attr('x', (width / 60000) * (d.xCord + 30000));
//           // tooltip.attr('y', (width / 60000) * (d.yCord + 30000));

//           // tooltip.text(`${d.code} \n ${d.name}`);
//         });

//       airportD3.append('title');
//     }
//   }, [data]);
//   return <div>Enter</div>;
// };

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const data = {
//     flights: await prisma.flight.findMany({
//       select: {
//         number: true,
//         plane: true,
//         gates: {
//           select: {
//             airport: true,
//             name: true,
//             size: true,
//           },
//         },
//       },
//     }),
//     airports: await prisma.airport.findMany({
//       select: {
//         xCord: true,
//         yCord: true,
//         name: true,
//         code: true,
//         cities: true,
//         gates: {
//           select: {
//             flights: {
//               select: {
//                 gates: {
//                   select: { airport: { select: { xCord: true, yCord: true } } },
//                 },
//               },
//             },
//           },
//         },
//       },
//     }),
//   };

//   return { props: { data }, revalidate: 100 };
// };
const Map = (props) => <div></div>;

export default Map;
