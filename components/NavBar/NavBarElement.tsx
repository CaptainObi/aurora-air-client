import Link from 'next/link';
interface Props {
  name: string;
  link: string;
}

const NavBarElement = ({ name, link }: Props) => {
  return (
    <div className="flex items-center justify-center h-full p-2 text-white hover:bg-aurora-purple">
      <Link href={link}>
        <h1 className="cursor-pointer">{name}</h1>
      </Link>
    </div>
  );
};

export default NavBarElement;
