import { Label, TextInput, Textarea } from "flowbite-react";
import { monographGroupsTextFields } from "./MonographFormFields";
import { appTextFields } from "./AppFormFields";

interface Props{
  type?: string;
  formData: { [key: string]: string | string[] };
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function GroupTextFields({ type, formData, handleTextChange }: Props) {

  let groups = monographGroupsTextFields;
  if (type === "app") { groups = appTextFields}

  return (
    <>
      {groups.map((group, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2">
            <group.icon />
            <Label className="text-md mx-2 font-sniglet text-nowrap" value={group.label} />
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
                  id={input.id}
                  type="text"
                  className="mx-2 my-1 font-quicksand"
                  placeholder={
                    input.required
                    ? `${input.placeholder}*`
                    : input.placeholder
                  }
                  required={input.required}
                  value={formData[input.id] || ""}
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
                  id={input.id}
                  placeholder={input.placeholder}
                  className="my-1 resize-none font-quicksand"
                  value={formData[input.id] || ""}
                  onChange={handleTextChange}
                  style={{ height: "auto", overflow: "hidden" }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  ref={(textarea) => {
                    if (textarea && formData[input.id]) {
                    textarea.style.height = "auto";
                    textarea.style.height = `${textarea.scrollHeight}px`;
                    }
                  }}
                  />
                )}
                </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default GroupTextFields;
