import { useState } from "react";
import { apiEditApp } from "../services/apiServices";
import { useFormData } from "./useFormData";

export function useEditApp(app: App, setOpenModal: (x: boolean) => void) {
  const {
    formData,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleAddListDropdownItem,
    handleDeleteListItem,
    clearInputs
  } = useFormData({
    name: app.name,
    plants: app.plants,
    sys: app.sys,
  });

  const [processingEdit, setProcessingEdit] = useState(false);

  async function handleEdit(id: number) {
    setProcessingEdit(true);
    const response = await apiEditApp({ formData: formData, id: id });
    setProcessingEdit(false);
    setOpenModal(false);
    clearInputs();
    return response.toastResponse;
  }

  return {
    formData,
    processingEdit,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleAddListDropdownItem,
    handleDeleteListItem,
    handleEdit,
    clearInputs
  };
}
