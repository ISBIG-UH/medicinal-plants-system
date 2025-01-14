import { Label, TextInput } from "flowbite-react";
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { monographListFields } from "./MonographFormFields";
import { appListFields } from "./AppFormFields";

interface Props {
  type?: string;
  formData: { [key: string]: string | string[] };
  handleFormListChange: (id: string, index: number, value: string) => void;
  handleAddListItem: (id: string) => void;
  handleDeleteListItem: (id: string, index: number) => void;
}

function ListFields({
  type,
  formData,
  handleFormListChange,
  handleAddListItem,
  handleDeleteListItem,
}: Props) {

  let groups = monographListFields;
  if (type === "app") { groups = appListFields }

  return (
    <>
      {groups.map((list, index) => (
        <div key={index}>
          <div className="flex items-center">
            <list.icon />
            <Label className="text-md mx-2 text-nowrap" value={list.label} />
          </div>
          <div className="flex flex-col">
            {Array.isArray(formData[list.id]) &&
              (formData[list.id] as string[]).map((value, idx) => (
                <div key={idx} className="flex space-x-2">
                  <TextInput
                    type="text"
                    placeholder={list.placeholder}
                    className="my-1 flex-grow"
                    value={value}
                    required={list.required}
                    onChange={(e) =>
                      handleFormListChange(list.id, idx, e.target.value)
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
                      handleDeleteListItem(list.id, idx);
                    }}
                  >
                    <IoIosRemoveCircle size={30} />
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
    </>
  );
}

export default ListFields;
