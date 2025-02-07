import { PiPlantBold } from "react-icons/pi";
import { TbListLetters } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { RiAddCircleLine } from "react-icons/ri";
import { CiMedicalCase } from "react-icons/ci";
import NavMenu from "./NavMenu";
import SideBar from "./SideBar";
import ContextSearchBoard from "./ContextSearchBoard";
import IndexSearchBoard from "./IndexSearchBoard";
import AddMonographBoard from "./AddMonographBoard";
import AppsBoard from "./AppsBoard";

const categories = [
  { icon: <PiPlantBold />, items: [
    { label: "Búsqueda contextual", icon: <IoIosSearch size={24} />, element: <ContextSearchBoard />},
    { label: "Búsqueda por índice", icon: <TbListLetters size={24} />, element: <IndexSearchBoard />},
    { label: "Nueva monografía", icon: <RiAddCircleLine size={24} />, element: <AddMonographBoard />},
    { label: "Aplicaciones", icon: <CiMedicalCase size={24} />, element: <AppsBoard />},
  ]}
]


function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <NavMenu />
      </div>
      <div className="flex flex-col flex-grow h-full overflow-y-auto lg:overflow-y-hidden">
        <SideBar categories={categories} />
      </div>
    </div>
  );
}

export default Home;
