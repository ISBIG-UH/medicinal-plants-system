import { PiPlantBold } from "react-icons/pi";
import { TbListLetters } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { RiAddCircleLine } from "react-icons/ri";
import NavMenu from "./NavMenu";
import SideBar from "./SideBar";
import ContextSearchBoard from "./ContextSearchBoard";
import IndexSearchBoard from "./IndexSearchBoard";
import AddMonographBoard from "./AddMonographBoard";

const categories = [
  { icon: <PiPlantBold />, items: [
    { label: "Nueva monografía", icon: <RiAddCircleLine size={24} />, element: <AddMonographBoard />},
    { label: "Búsqueda por índice", icon: <TbListLetters size={24} />, element: <IndexSearchBoard />},
    { label: "Búsqueda contextual", icon: <IoIosSearch size={24} />, element: <ContextSearchBoard />},
  ]}
]


function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <NavMenu />
      </div>
      <div className="flex flex-col flex-grow lg:overflow-y-hidden">
        <SideBar categories={categories} />
      </div>
    </div>
  );
}

export default Home;
