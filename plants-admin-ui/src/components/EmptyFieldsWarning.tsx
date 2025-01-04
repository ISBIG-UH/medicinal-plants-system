import { Alert } from "flowbite-react";
import { groupsTextFields } from "./MonographFormFields";
import { ImWarning } from "react-icons/im";

interface Props {
  formData: { [key: string]: string | string[] };
}

function EmptyFieldsWarning({ formData }: Props) {
  return (
    <>
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
    </>
  );
}

export default EmptyFieldsWarning;
