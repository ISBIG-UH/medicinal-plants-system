import AppSideBar from "./AppSideBar";
import AppTopbar from "./AppTopbar";

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
        <div>
            <AppTopbar/>
        </div>
        <div className="flex flex-col flex-grow h-full overflow-y-auto lg:overflow-y-hidden">
            <AppSideBar/>
        </div>
    </div>
  );
};

export default AppLayout;
