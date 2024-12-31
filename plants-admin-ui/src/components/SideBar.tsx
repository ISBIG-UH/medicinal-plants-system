import { GiHamburgerMenu } from "react-icons/gi";
import SideBarItem from "./SideBarItem";
// import { MdOutlineExitToApp } from "react-icons/md";
import { useSidebar } from "../hooks/useSidebar";

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

            {/* <li className="m-2 p-2 text-center bg-red-400 hover:bg-red-600 hover:cursor-pointer rounded-lg">
              <div className="flex">
                <MdOutlineExitToApp size={24} />
                <button className="mx-2 font-semibold">Cerrar sesión</button>
              </div>
            </li> */}

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
