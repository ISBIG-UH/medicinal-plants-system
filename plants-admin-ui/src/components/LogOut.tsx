import { useState } from "react";
import { MdOutlineExitToApp } from "react-icons/md";
import { clearUser } from "../localStorageIntermediate";
import DangerConfirmationModal from "./DangerConfirmationModal";

function LogOut() {
  const [openModal, setOpenModal] = useState(false);

  function handleLogout(): void {
    setOpenModal(false);
    clearUser();
    window.location.href = "/";
  }

  return (
    <>
      <li
        className="m-1 p-2 text-center bg-red-300 hover:bg-red-400 hover:cursor-pointer rounded-lg"
        onClick={() => setOpenModal(true)}
      >
        <div className="flex">
          <MdOutlineExitToApp size={24} />
          <button className="mx-2 font-quicksand whitespace-nowrap overflow-hidden text-ellipsis">
            Cerrar sesión
          </button>
        </div>
      </li>

      <DangerConfirmationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        operationFunction={handleLogout}
        msg="¿Seguro que desea cerrar la sesión?"
        processing={false}
      />
    </>
  );
}

export default LogOut;
