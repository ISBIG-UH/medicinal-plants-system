import { Button, Modal } from "flowbite-react";
import DangerConfirmationModal from "./DangerConfirmationModal";
import { useDeleteMonograph } from "../hooks/useDeleteMonograh";
import { useEditMonograph } from "../hooks/useEditMonograph";
import GroupTextFields from "./GroupTextFields";
import ListFields from "./ListFields";
import EmptyFieldsWarning from "./EmptyFieldsWarning";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";

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
    processingDelete,
  } = useDeleteMonograph(monograph, setOpenModal);

  const {
    formData,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleDeleteListItem,
    submit,
    processingEdit,
  } = useEditMonograph(monograph, setOpenModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  try {
    const response = await submit();

    if (response.type === "success") {
      toast.success(response.msg);
    } else if (response.type === "error") {
      toast.error(response.msg);
    }
  } catch (error) {
    toast.error("Ocurrió un error inesperado.");
  }
  }; 

  const handleDelete = async () => {
    toast.dismiss();
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
              <Button color="failure" size="xs" onClick={handleConfirmation} disabled={processingEdit || processingDelete} isProcessing={processingDelete} processingSpinner={<AiOutlineLoading className="h-4 w-4 animate-spin" />} >
                Eliminar
              </Button>
              <Button type="submit" size="xs" color="success" disabled={processingEdit || processingDelete} isProcessing={processingEdit} processingSpinner={<AiOutlineLoading className="h-4 w-4 animate-spin" />}>
                Guardar
              </Button>
              <Button color="gray" size="xs" onClick={() => setOpenModal(false)} disabled={processingEdit || processingDelete}>
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
        processing={processingDelete}
      />
    </div>
  );
}

export default EditPlantModal;
