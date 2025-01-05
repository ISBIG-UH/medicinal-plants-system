import { Button, Modal } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Props {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  operationFunction: () => void;
  msg: string;
  processing: boolean;
}

function DangerConfirmationModal({ openModal, setOpenModal, operationFunction, msg, processing }: Props) {
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
            <Button
              color="failure"
              onClick={() => operationFunction()}
              disabled={processing}
              isProcessing={processing}
              processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
            >
              Sí
            </Button>
            <Button
              color="gray"
              onClick={() => setOpenModal(false)}
              disabled={processing}
            >
              No
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DangerConfirmationModal;