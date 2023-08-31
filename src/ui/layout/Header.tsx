import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="container max-w-7xl py-8">
        <div className="text-center text-4xl leading-[100%] font-black">
          <Link href="/">EMERSOFT NEWS</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
