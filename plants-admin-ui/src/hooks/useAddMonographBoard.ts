import { useState } from "react";
import { apiAddMonograph } from "../services/apiServices";

export function useAddMonographBoard() {
  const [formData, setFormData] = useState<{
    [key: string]: string | string[];
  }>({
    name: "",
    genus: "",
    species: "",
    authors: "",
    subsp: "",
    var: "",
    f: "",
    family: "",
    subfamily: "",
    hab: "",
    des: "",
    cmp: "",
    use: "",
    pro: "",
    app: "",
    cul: "",
    sy: [],
    vul: [],
    bib: [],
  });
  const [processingRequest, setProcessingRequest] = useState(false);


  const submit = async () => {
    setProcessingRequest(true);
    const response = await apiAddMonograph({ formData: formData })
    setProcessingRequest(false);
    clearFields();
    return response.toastResponse;
  };

  function clearFields(){
    setFormData({
      name: "",
      genus: "",
      species: "",
      authors: "",
      subsp: "",
      var: "",
      f: "",
      family: "",
      subfamily: "",
      hab: "",
      des: "",
      cmp: "",
      use: "",
      pro: "",
      app: "",
      cul: "",
      sy: [],
      vul: [],
      bib: [],
    });
  }


  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Dont let start with space
    if (e.target.value.startsWith(" ")) {
      e.target.value = e.target.value.trim();
    }

    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  function handleListChange(id: string, index: number, value: string) {
    const newFormData = [...formData[id]];
    newFormData[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      [id]: newFormData,
    }));
  }

  function handleDeleteListItem(id: string, index: number) {
    const newFormData = [...formData[id]];
    newFormData.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      [id]: newFormData,
    }));
  }

  function handleAddListItem(id: string): void {
    setFormData((prevData) => ({
      ...prevData,
      [id]: [...prevData[id], ""],
    }));
  }

  return { formData, submit, handleTextChange, handleListChange, handleDeleteListItem, handleAddListItem, processingRequest };
}
