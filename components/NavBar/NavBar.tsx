import NavBarElement from './NavBarElement';

const NavBar = ({}) => {
  return (
    <div className="flex items-center w-full h-12 bg-aurora-blue">
      <NavBarElement name="Map" link="/map" />
    </div>
  );
};

export default NavBar;
