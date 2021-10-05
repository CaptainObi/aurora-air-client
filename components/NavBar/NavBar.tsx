import NavBarElement from './NavBarElement';

interface Elements {
  label: string;
  link: string;
}

const NavBar = ({}) => {
  const elements: Elements[] = [
    { label: 'Map', link: '/map' },
    { label: 'All Flights', link: '/flights' },
    { label: 'Home', link: '/' },
    { label: 'Hubs', link: '/hubs' },
    { label: 'Planes', link: '/planes' },
  ].sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <div className="flex items-center w-full h-12 bg-aurora-blue">
      {elements.map(({ label, link }) => (
        <NavBarElement link={link} name={label} />
      ))}
    </div>
  );
};

export default NavBar;
