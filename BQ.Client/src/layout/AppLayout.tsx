import { Outlet } from "react-router";
import AppSideBar from "./AppSideBar";
import AppTopbar from "./AppTopbar";

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
        <AppTopbar/>
        <div className="flex flex-row flex-grow h-full overflow-y-auto lg:overflow-y-hidden">
            <div className="md:w-64 w-full">
                <AppSideBar/>
            </div>
            <div className="flex-auto">
                <Outlet/>
            </div>
        </div>
    </div>
  );
};

export default AppLayout;
