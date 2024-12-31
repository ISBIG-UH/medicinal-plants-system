import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
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
          {mobileOpenMenu ? <IoCloseSharp size={30}/> : <GiHamburgerMenu size={30}/>}
        </button>
      </div>

      <div className="flex flex-row h-full">
        <div
          className={`bg-gray-200 overflow-hidden transition-max-width duration-500 ease-in-out ${
            mobileOpenMenu ? "max-w-full" : "max-w-0"
          } lg:max-w-none lg:rounded-r-xl flex-grow lg:flex-none flex flex-col`}
        >
          <p className="m-2 text-center text-xl font-semibold font-serif py-2">
            Menu
          </p>
          <hr className="border-gray-300 mx-6"/>

          <ul className="px-10 sm:px-20 md:px-36 lg:px-2 my-4 flex flex-col flex-grow">

            {categories.map((cat) => (
              <SideBarItem
                label={cat.label}
                icon={cat.icon}
                element={cat.element}
                selector={selectCategory}
              />
            ))}
            
            <hr className="border-gray-300 my-4 mx-6"/>

            <div className="lg:mt-auto">
                <LogOut />
            </div>

          </ul>

        </div>
        <div className={`overflow-hidden transition-max-width duration-500 ease-in-out ${
            !mobileOpenMenu ? "max-w-full" : "max-w-0"
          } lg:max-w-none flex flex-col flex-grow`}>
            {selectedCategory}
        </div>
      </div>
    </>
  );
}

export default SideBar;
