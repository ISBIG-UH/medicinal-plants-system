import { Link } from "react-router-dom";
import Profile from "./Profile";

function NavMenu() {
  return (
    <nav className="bg-primary lg:px-32">
      <div className="flex items-center justify-between px-4 pt-4 pb-2 lg:pt-2">
        <Link
          className="text-white font-bold text-4xl flex items-center"
          to="/"
        >
          <img className="max-h-10 lg:max-h-12" src="1.png" />
          <img className="max-h-10 ml-1" src="BotaniQ_bg_secondary.png" />
        </Link>

        <div>
          <Profile />
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
