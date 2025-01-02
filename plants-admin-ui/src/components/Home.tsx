import { PiPlantBold } from "react-icons/pi";
import { TbListLetters } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import NavMenu from "./NavMenu";
import SideBar from "./SideBar";
import PlantsBoard from "./ContextSearchBoard";

const categories = [
  { icon: <PiPlantBold />, items: [
    { label: "Búsqueda por índice", icon: <TbListLetters size={24} />, element: <div>Otra cosa</div>},
    { label: "Búsqueda contextual", icon: <IoIosSearch size={24} />, element: <PlantsBoard />},
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
