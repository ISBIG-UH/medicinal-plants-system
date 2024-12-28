import { useState } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

interface Props{
  navItems: NavItem[]
}

function NavMenu({navItems}: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-accent lg:flex lg:justify-between lg:items-center lg:px-32">
      <div className="flex items-center justify-between px-4 pt-4 lg:pt-2">
        <Link className="text-white font-bold text-4xl flex" to="/">
          <img className="max-h-14" src="jbn.svg" />
        </Link>
        <button
          className="text-secondary lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <IoCloseSharp size={30} />
          ) : (
            <TiThMenu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu (hidden by default on larger screens) */}
      <ul
        className={`overflow-hidden transition-max-height duration-500 ease-in-out lg:flex py-1 lg:items-center lg:space-x-6 lg:p-0 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        } lg:max-h-none`}
      >
        {navItems.map((item) => (
          <li key={item.label} className="py-2 ml-5 my-1 lg:py-0">
            <Link
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-secondary font-medium hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;
