import { Modal, Tooltip } from "flowbite-react";
import { useState } from "react";
import { MdOutlineExitToApp } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Profile() {
  const [openModal, setOpenModal] = useState(false);

    function handleLogout(): void {
        setOpenModal(false);
        alert("Logging out...")
        throw new Error("Function not implemented.");
    }

  return (
    <>
      <Tooltip content="Cerrar sesión" arrow={false}>
        <button
          className="bg-danger hover:bg-red-600 text-primary p-2 rounded-lg"
          onClick={() => setOpenModal(true)}
        >
          <MdOutlineExitToApp size={23} />
        </button>
      </Tooltip>
      <Modal
        show={openModal}
        size="sm"
        onClose={() => setOpenModal(false)}
        popup
        position="center"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20 text-gray-300 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Está seguro que desea cerrar la sesión?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-danger px-6 py-2 rounded font-semibold hover:bg-red-600"
                onClick={() => handleLogout()}
              >
                Sí
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded font-semibold hover:bg-gray-400"
                onClick={() => setOpenModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
