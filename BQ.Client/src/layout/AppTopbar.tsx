import { Link } from "react-router-dom";
import { Button } from 'primereact/button';

const AppTopbar: React.FC = () => {
  return (
    <div className="bg-primary flex py-2">
      <div className="w-3/4 flex-none pl-2 lg:pl-32">
        <div className="flex items-center gap-2">
          <Button rounded icon="pi pi-bars" className="md:hidden"></Button>
          <Link
            className="text-white font-bold text-4xl flex items-center space-x-1"
            to="/"
          >
            <img className="max-h-10 lg:max-h-12" src="1.png" alt="BotaniQ Logo" />
            <p className="font-montserrat font-thin text-secondary">BotaniQ</p>
          </Link>
        </div>
      </div>
      <div className="w-1/4 pr-2 lg:pr-28 items-center justify-end flex">
        <div className="flex h-100 items-center gap-1">
          <label className="text-secondary hidden md:block">Iniciar sesión</label>
          <Button rounded icon="pi pi-sign-in" />
        </div>
      </div>
    </div>
  );
};

export default AppTopbar;
