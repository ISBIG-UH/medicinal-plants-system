import { useState } from "react";

export function useEditMonograph(
  monograph: Monograph,
  setOpenModal: (x: boolean) => void
) {
  const [formData, setFormData] = useState<{
    [key: string]: string | string[];
  }>({
    name: monograph.name,
    genus: monograph.genus,
    species: monograph.species,
    authors: monograph.authors,
    subsp: monograph.subsp,
    var: monograph.var,
    f: monograph.f,
    family: monograph.family,
    subfamily: monograph.subfamily,
    Hab: monograph.Hab,
    Des: monograph.Des,
    Cmp: monograph.Cmp,
    Use: monograph.Use,
    Pro: monograph.Pro,
    Cul: monograph.Cul,
    App: monograph.App,
    Sy: monograph.Sy,
    Vul: monograph.Vul,
    Bib: monograph.Bib,
  });

  const handleFormTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.startsWith(" ")) {
      e.target.value = e.target.value.trim();
    }
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFormListChange = (id: string, index: number, value: string) => {
    setFormData((prevData) => {
      const updatedList = Array.isArray(prevData[id]) ? [...prevData[id]] : [];
      updatedList[index] = value;
      return {
        ...prevData,
        [id]: updatedList,
      };
    });
  };

  function handleAddListItem(id: string) {
    setFormData((prevData) => {
      const updatedList = Array.isArray(prevData[id]) ? [...prevData[id]] : [];
      updatedList.push("");
      return {
        ...prevData,
        [id]: updatedList,
      };
    });
  }

  function handleDeleteListItem(id: string, index: number) {
    setFormData((prevData) => {
      const updatedList = Array.isArray(prevData[id]) ? [...prevData[id]] : [];
      updatedList.splice(index, 1);
      return {
        ...prevData,
        [id]: updatedList,
      };
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setOpenModal(false);

    // Send data to the server
    //////////////////////////////////////////////////
    //////// 🚨🚨Implementar solicitud🚨🚨 /////////
    ////////////////////////////////////////////////

    console.log("Datos enviados:", formData);
  }

  return { formData, handleFormTextChange, handleFormListChange, handleAddListItem, handleDeleteListItem, handleSubmit };
}
