import { GiHamburgerMenu } from "react-icons/gi";
import SideBarItem from "./SideBarItem";
import { useSidebar } from "../hooks/useSidebar";
import LogOut from "./LogOut";

interface Props {
  categories: SidebarItem[];
}

function SideBar({ categories }: Props) {
  const { mobileOpenMenu, setMobileOpenMenu, selectedCategory, selectCategory } = useSidebar(categories);

  return (
    <>
      <div className="bg-primary flex justify-start px-2 text-secondary lg:hidden">
        <button
          className="hover:bg-green-800 p-2 m-1 rounded"
          onClick={() => setMobileOpenMenu(!mobileOpenMenu)}
        >
          <GiHamburgerMenu size={30} />
        </button>
      </div>

      <div className="flex flex-row h-full">
        <div
          className={`bg-gray-100 overflow-hidden transition-max-width duration-500 ease-in-out ${
            mobileOpenMenu ? "max-w-96" : "max-w-0"
          } lg:max-w-none rounded-r-xl`}
        >
          <p className="m-2 text-center text-xl font-semibold font-serif py-2">
            Menu
          </p>

          <ul className="px-2">

            {categories.map((cat) => (
              <SideBarItem
                label={cat.label}
                icon={cat.icon}
                element={cat.element}
                selector={selectCategory}
              />
            ))}
            
            <LogOut />

          </ul>

        </div>
        <div className="flex-grow">
            {selectedCategory}
        </div>
      </div>
    </>
  );
}

export default SideBar;
