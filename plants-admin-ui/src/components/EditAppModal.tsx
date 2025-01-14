import { Button, Modal } from "flowbite-react";
import EmptyFieldsWarning from "./EmptyFieldsWarning";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import GroupTextFields from "./GroupTextFields";
import ListFields from "./ListFields";
import { useEditApp } from "../hooks/useEditApp";

interface Props {
  app: App;
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  reloadFunction: () => void;
}

function EditAppModal({ openModal, setOpenModal, app, reloadFunction }: Props) {
  
  const { formData, processingEdit, handleFormTextChange, handleFormListChange, handleAddListItem, handleDeleteListItem, handleEdit, clearInputs } = useEditApp(app, setOpenModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await handleEdit();

      if (response.type === "success") {
        toast.success(response.msg);
      } else if (response.type === "error") {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado.");
    }

    reloadFunction();
  };

  const cancelModal = () => {
    setOpenModal(false);
    clearInputs();
  }

  return (
    <div>
      <Modal show={openModal} size="5xl" onClose={() => setOpenModal(false)}>
        <Modal.Header className="shadow-lg shadow-gray-200">
          <p className="text-2xl font-semibold">Editar Aplicación</p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">

            <GroupTextFields
              type="app"
              formData={formData}
              handleTextChange={handleFormTextChange}
            />
            <ListFields
              type="app"
              formData={formData}
              handleFormListChange={handleFormListChange}
              handleAddListItem={handleAddListItem}
              handleDeleteListItem={handleDeleteListItem}
            />

            <EmptyFieldsWarning formData={formData} />

            <div className="flex justify-end space-x-2">
              <Button
                type="submit"
                size="xs"
                color="success"
                disabled={processingEdit}
                isProcessing={processingEdit}
                processingSpinner={
                  <AiOutlineLoading className="h-4 w-4 animate-spin" />
                }
              >
                Guardar
              </Button>
              <Button
                color="gray"
                size="xs"
                onClick={cancelModal}
                disabled={processingEdit}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditAppModal;
