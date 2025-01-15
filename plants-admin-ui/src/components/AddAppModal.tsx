import { Button, Modal } from "flowbite-react";
import EmptyFieldsWarning from "./EmptyFieldsWarning";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import GroupTextFields from "./GroupTextFields";
import ListFields from "./ListFields";
import { useAddApp } from "../hooks/useAddApp";

interface Props {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  reloadFunction: () => void;
}

function AddAppModal({ openModal, setOpenModal, reloadFunction }: Props) {
  const emptyApp = { id: 0, name: "", plants: [], sys: []}
  const { formData, processingAdd, handleFormTextChange, handleFormListChange, handleAddListItem, handleDeleteListItem, handleAdd, clearInputs } = useAddApp(emptyApp, setOpenModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await handleAdd();

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
          <p className="text-2xl font-montserrat font-semibold">Nueva Aplicación</p>
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

            <div className="flex justify-end font-quicksand space-x-2">
              <Button
                type="submit"
                size="xs"
                color="success"
                className="bg-primary"
                disabled={processingAdd}
                isProcessing={processingAdd}
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
                disabled={processingAdd}
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

export default AddAppModal;
