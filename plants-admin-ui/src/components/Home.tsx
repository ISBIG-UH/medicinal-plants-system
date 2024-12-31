import { PiPlantBold } from "react-icons/pi";
import NavMenu from "./NavMenu";
import SideBar from "./SideBar";
import PlantsBoard from "./PlantsBoard";

const categories = [
  { label: "Plantas", icon: <PiPlantBold size={24} />, element: <PlantsBoard />},
  { label: "Otra cosa", icon: <PiPlantBold size={24} />, element: <div>Otra cosa</div>},
]

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <NavMenu />
      </div>
      <div className="bg-red-200 flex-grow">
        <SideBar categories={categories} />
      </div>
    </div>
  );
}

export default Home;
