import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Props {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  operationFunction: () => void;
  msg: string;
}

function DangerConfirmationModal({ openModal, setOpenModal, operationFunction, msg }: Props) {
  return (
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
            {msg}
          </h3>
          <div className="flex justify-center gap-4">
            <button
              className="bg-danger px-6 py-2 rounded font-semibold hover:bg-red-600"
              onClick={() => operationFunction()}
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
  );
}

export default DangerConfirmationModal;