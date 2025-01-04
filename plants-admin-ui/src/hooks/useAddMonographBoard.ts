import { useState } from "react";

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
    fam: "",
    subfam: "",
    Hab: "",
    Des: "",
    Cmp: "",
    Use: "",
    Pro: "",
    App: "",
    Cul: "",
    Sy: [],
    Vul: [],
    Bib: [],
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send data to the server
    //////////////////////////////////////////////////
    //////// 🚨🚨Implementar solicitud🚨🚨 /////////
    ////////////////////////////////////////////////

    console.log("Datos enviados:", formData);
  };


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

  return { formData, handleSubmit, handleTextChange, handleListChange, handleDeleteListItem, handleAddListItem };
}
