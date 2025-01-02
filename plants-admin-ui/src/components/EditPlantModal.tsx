import { Button, Modal } from "flowbite-react";

interface Props {
    monograph: Monograph;
    openModal: boolean;
    setOpenModal: (x: boolean) => void;
}

function EditPlantModal({ openModal, setOpenModal, monograph }: Props) {

  return (
    <div>
      <Modal show={openModal} size='5xl' onClose={() => setOpenModal(false)}>
        <Modal.Header>{monograph.Name}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => setOpenModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default EditPlantModal;