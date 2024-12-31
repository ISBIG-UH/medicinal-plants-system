import { PiPlantBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import NavMenu from "./NavMenu";
import SideBar from "./SideBar";
import PlantsBoard from "./PlantsBoard";

const categories = [
  { label: "Monografías", icon: <PiPlantBold size={24} />, element: <PlantsBoard />},
  { label: "Otra cosa", icon: <IoMdSettings size={24} />, element: <div>Otra cosa</div>},
]

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <NavMenu />
      </div>
      <div className="flex flex-col flex-grow">
        <SideBar categories={categories} />
      </div>
    </div>
  );
}

export default Home;
