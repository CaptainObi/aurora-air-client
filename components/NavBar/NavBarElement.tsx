import Link from 'next/link';
interface Props {
  name: string;
  link: string;
}

const NavBarElement = ({ name, link }: Props) => {
  return (
    <div className="flex items-center justify-center h-full p-2 hover:bg-aurora-purple">
      <Link href={link}>
        <a className="">{name}</a>
      </Link>
    </div>
  );
};

export default NavBarElement;
