import { Alert } from "flowbite-react";
import { monographGroupsTextFields } from "./MonographFormFields";
import { ImWarning } from "react-icons/im";

interface Props {
  formData: { [key: string]: string | string[] };
}

function EmptyFieldsWarning({ formData }: Props) {
  return (
    <>
      {Object.keys(formData).some(
        (key) =>
          !monographGroupsTextFields.some((group) =>
            group.inputs.some((input) => input.id === key && input.required)
          ) && formData[key] === ""
      ) && (
        <Alert color="warning" className="font-quicksand" icon={ImWarning}>
          <span className="font-bold ">Atención!</span> Los campos no
          obligatorios que quedan vacíos se guardarán como vacíos.
        </Alert>
      )}
    </>
  );
}

export default EmptyFieldsWarning;
