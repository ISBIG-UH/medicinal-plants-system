import { Button, Modal } from "flowbite-react";
import DangerConfirmationModal from "./DangerConfirmationModal";
import { useDeleteMonograph } from "../hooks/useDeleteMonograh";
import { useEditMonograph } from "../hooks/useEditMonograph";
import GroupTextFields from "./GroupTextFields";
import ListFields from "./ListFields";
import EmptyFieldsWarning from "./EmptyFieldsWarning";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  monograph: Monograph;
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
}

function EditPlantModal({ openModal, setOpenModal, monograph }: Props) {
  const {
    handleConfirmation,
    delete_,
    confirmationOpen,
    setConfirmationOpen,
  } = useDeleteMonograph(monograph, setOpenModal);

  const {
    formData,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleDeleteListItem,
    submit,
  } = useEditMonograph(monograph, setOpenModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await submit();

    if (response.type == "error") {
      toast.error(response.msg);
    } else if (response.type == "success") {
      toast.success(response.msg);
    } else if (response.type == "null") {
      return;
    }
  };

  

  const handleDelete = async () => {
    const response = await delete_();
    
    if (response.type == "error") {
      toast.error(response.msg);
    } else if (response.type == "success") {
      toast.success(response.msg);
    } else if (response.type == "null") {
      return;
    }
  }

  return (
    <div>
      <Modal show={openModal} size="5xl" onClose={() => setOpenModal(false)}>
        <Modal.Header className="shadow-lg shadow-gray-200">
          <p className="text-2xl font-semibold">Editar Monografía</p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">

            <GroupTextFields
              formData={formData}
              handleTextChange={handleFormTextChange}
            />
            <ListFields
              formData={formData}
              handleFormListChange={handleFormListChange}
              handleAddListItem={handleAddListItem}
              handleDeleteListItem={handleDeleteListItem}
            />

            <EmptyFieldsWarning formData={formData} />

            <div className="flex justify-end space-x-2">
              <Button color="failure" onClick={handleConfirmation}>
                Eliminar
              </Button>
              <Button type="submit" color="success">
                Guardar
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <DangerConfirmationModal
        openModal={confirmationOpen}
        setOpenModal={setConfirmationOpen}
        operationFunction={handleDelete}
        msg="¿Seguro que desea eliminar esta monografía?"
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default EditPlantModal;
