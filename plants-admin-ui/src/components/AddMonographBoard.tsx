import { useAddMonographBoard } from "../hooks/useAddMonographBoard";
import { Button } from "flowbite-react";
import GroupTextFields from "./GroupTextFields";
import ListFields from "./ListFields";
import EmptyFieldsWarning from "./EmptyFieldsWarning";

function AddMonographBoard() {
  const {
    formData,
    handleSubmit,
    handleTextChange,
    handleListChange,
    handleDeleteListItem,
    handleAddListItem,
  } = useAddMonographBoard();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <h2 className="mx-4 my-6 text-center text-2xl lg:text-4xl font-semibold text-nowrap">
        Agregar Monografía
      </h2>

      <div className="h-full px-6 sm:px-20 md:px-32 xl:px-64 overflow-y-scroll">
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
          <Button type="submit" color="success">
            Guardar
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddMonographBoard;
