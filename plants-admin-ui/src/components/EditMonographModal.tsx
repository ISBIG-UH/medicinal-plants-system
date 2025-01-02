import { Button, Modal } from "flowbite-react";

interface Props {
  monograph: Monograph | null;
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
}

function EditPlantModal({ openModal, setOpenModal, monograph }: Props) {

  return (
    <div>
      <Modal show={openModal} size='5xl' onClose={() => setOpenModal(false)}>
      <Modal.Header className="shadow-lg shadow-gray-200">
        <div className="flex items-center space-x-2">
            <div><img className="w-8" src="1.png"/></div>
            <p className="text-primary text-4xl">{monograph?.Name}</p>
        </div>
        <p className="text-gray-400 text-md">
          {monograph?.Sc.genus} {monograph?.Sc.species} {monograph?.Sc.authors} 
          {monograph?.Sc.var} {monograph?.Sc.subsp} {monograph?.Sc.f}
        </p>
      </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="success" onClick={() => setOpenModal(false)}>Save</Button>
          <Button color="secondary" onClick={() => setOpenModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default EditPlantModal;