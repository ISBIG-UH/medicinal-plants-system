import { Alert, Button, Label, Textarea, TextInput } from "flowbite-react";
import { ImWarning } from "react-icons/im";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useAddMonographBoard } from "../hooks/useAddMonographBoard";
import { groupsTextFields, listFields } from "./AddMonographBoardFields";

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
        Añadir nueva monografía
      </h2>

      <div className="h-full px-6 sm:px-20 md:px-32 xl:px-64 overflow-y-scroll">
        <div className="space-y-4 mb-6">
          {groupsTextFields.map((group, index) => (
            <div key={index}>
              <div className="flex items-center space-x-2">
                {<group.icon />}
                <Label
                  className="text-md mx-2 text-nowrap"
                  value={group.label}
                />
              </div>
              <div
                className={`${
                  group.useFlex
                    ? "flex flex-col"
                    : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6"
                }`}
              >
                {group.inputs.map((input, index) => (
                  <div key={index}>
                    {!input.useArea ? (
                      <TextInput
                        key={index}
                        id={input.id}
                        type="text"
                        className="mx-2 my-1"
                        placeholder={
                          input.required
                            ? `${input.placeholder}*`
                            : input.placeholder
                        }
                        required={input.required}
                        value={formData[input.id]}
                        onChange={handleTextChange}
                        onInvalid={(e) => {
                          (e.target as HTMLInputElement).setCustomValidity(
                            "Por favor, llene este campo."
                          );
                        }}
                        onInput={(e) => {
                          (e.target as HTMLInputElement).setCustomValidity("");
                        }}
                      />
                    ) : (
                      <Textarea
                        key={index}
                        id={input.id}
                        placeholder={input.placeholder}
                        className="my-1 resize-none"
                        value={formData[input.id]}
                        onChange={handleTextChange}
                        style={{ height: "auto", overflow: "hidden" }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {listFields.map((list, index) => (
            <div key={index}>
              <div className="flex items-center">
                {<list.icon />}
                <Label
                  className="text-md mx-2 text-nowrap"
                  value={list.label}
                />
              </div>
              <div className="flex flex-col">
                {Array.isArray(formData[list.id]) &&
                  (formData[list.id] as string[]).map((value, index) => (
                    <div key={index} className="flex space-x-2">
                      <TextInput
                        type="text"
                        placeholder={list.placeholder}
                        className="my-1 flex-grow"
                        value={value}
                        required={list.required}
                        onChange={(e) =>
                          handleListChange(list.id, index, e.target.value)
                        }
                        onInvalid={(e) => {
                          (e.target as HTMLInputElement).setCustomValidity(
                            "Por favor, llene este campo."
                          );
                        }}
                        onInput={(e) => {
                          (e.target as HTMLInputElement).setCustomValidity("");
                        }}
                      />
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteListItem(list.id, index);
                        }}
                      >
                        <MdDeleteForever size={30} />
                      </button>
                    </div>
                  ))}
                {Array.isArray(formData[list.id]) &&
                  formData[list.id].length === 0 && (
                    <span className="text-sm text-gray-400">
                      No se añadirán elementos
                    </span>
                  )}
                <button
                  className="text-primary w-fit hover:text-green-800 mx-1 h-fit rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddListItem(list.id);
                  }}
                >
                  <IoMdAddCircle size={40} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show empty fileds warning */}
        {Object.keys(formData).some(
          (key) =>
            !groupsTextFields.some((group) =>
              group.inputs.some((input) => input.id === key && input.required)
            ) && formData[key] === ""
        ) && (
          <Alert color="warning" icon={ImWarning}>
            <span className="font-medium">Atención!</span> Los campos no
            obligatorios que quedan vacíos se guardarán como vacíos.
          </Alert>
        )}

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
