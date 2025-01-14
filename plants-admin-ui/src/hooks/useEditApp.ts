import { useState } from "react";
import { apiEditApp } from "../services/apiServices";
import { useFormData } from "./useFormData";

export function useEditApp(app: App, setOpenModal: (x: boolean) => void) {
  const {
    formData,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleDeleteListItem,
    clearInputs
  } = useFormData({
    name: app.name,
    plants: app.plants,
    sys: app.sys,
  });

  const [processingEdit, setProcessingEdit] = useState(false);

  async function handleEdit() {
    setProcessingEdit(true);
    const response = await apiEditApp({ formData: formData });
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
    handleDeleteListItem,
    handleEdit,
    clearInputs
  };
}
