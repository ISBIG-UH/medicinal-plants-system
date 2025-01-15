import { Link } from "react-router-dom";

function NavMenu() {
  return (
    <nav className="bg-primary lg:px-32">
      <div className="flex items-center justify-between px-4 pt-4 pb-2 lg:pt-2">
        <Link
          className="text-white font-bold text-4xl flex items-center space-x-1"
          to="/"
        >
          <img className="max-h-10 lg:max-h-12" src="1.png" />
          <p className="font-montserrat font-thin text-secondary">BotaniQ</p>
        </Link>
      </div>
    </nav>
  );
}

export default NavMenu;
