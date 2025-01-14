import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import SideBarItem from "./SideBarItem";
import { useSidebar } from "../hooks/useSidebar";
import LogOut from "./LogOut";
import HRIcon from "./HRIcon";

interface Props {
  categories: SidebarGroup[];
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

      <div className="flex flex-row overflow-y-auto h-full">
        <div
          className={`bg-gray-200 overflow-hidden transition-max-width duration-500 ease-in-out ${
            mobileOpenMenu ? "max-w-full" : "max-w-0"
          } lg:max-w-none lg:rounded-r-xl flex-grow lg:flex-none flex flex-col`}
        >
          <p className="m-2 text-center text-xl font-semibold font-serif py-2">
            Menu
          </p>

          {
            categories.map((group, i) => (
              <ul key={i} className="px-10 sm:px-20 md:px-36 lg:px-2 flex flex-col flex-grow">
                <HRIcon className="px-10 mt-5 mb-2" icon={group.icon}/>
                {group.items.map((item, i) => (
                  <SideBarItem
                    key={i}
                    label={item.label}
                    icon={item.icon}
                    element={item.element}
                    selector={selectCategory}
                  />
                ))}

                <div className="lg:mt-auto lg:mb-4 lg:mx-6">
                  <HRIcon className="px-10 mt-5 mb-2" icon={<MdOutlineAccountCircle/>}/>
                  <LogOut />
                </div>
              </ul>
            ))
          }
        </div>

        <div className={`lg:overflow-hidden overflow-x-hidden transition-max-width duration-500 ease-in-out ${
            !mobileOpenMenu ? "max-w-full" : "max-w-0"
          } lg:max-w-none h-full flex flex-col flex-grow`}>
            {selectedCategory}
        </div>

      </div>
    </>
  );
}

export default SideBar;
