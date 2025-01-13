import { useAddMonographBoard } from "../hooks/useAddMonographBoard";
import { Button } from "flowbite-react";
import GroupTextFields from "./GroupTextFields";
import ListFields from "./ListFields";
import EmptyFieldsWarning from "./EmptyFieldsWarning";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";

function AddMonographBoard() {
  const {
    formData,
    submit,
    handleTextChange,
    handleListChange,
    handleDeleteListItem,
    handleAddListItem,
    processingRequest,
  } = useAddMonographBoard();

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-y-auto">
      <h2 className="px-4 m-1 py-4 text-center text-xl lg:text-2xl bg-primary text-secondary rounded-lg font-semibold text-nowrap">
        Nueva Monografía
      </h2>

      <div className="h-full pt-4 px-6 sm:px-20 md:px-32 xl:px-64">
        <div className="space-y-4 mb-6">
          <GroupTextFields
            formData={formData}
            handleTextChange={handleTextChange}
          />
          <ListFields
            formData={formData}
            handleFormListChange={handleListChange}
            handleAddListItem={handleAddListItem}
            handleDeleteListItem={handleDeleteListItem}
          />
        </div>

        <EmptyFieldsWarning formData={formData} />

        <div className="flex p-4 justify-end m-2 mt-6 text-center">
          <Button type="submit" color="success" disabled={processingRequest} isProcessing={processingRequest} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>
            Guardar
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddMonographBoard;
