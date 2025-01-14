import { useState } from "react";
import { apiAddApp } from "../services/apiServices";
import { useFormData } from "./useFormData";

export function useAddApp(app: App, setOpenModal: (x: boolean) => void) {
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

  const [processingAdd, setProcessingAdd] = useState(false);

  async function handleAdd() {
    setProcessingAdd(true);
    const response = await apiAddApp({ formData: formData });
    setProcessingAdd(false);
    setOpenModal(false);
    clearInputs();
    return response.toastResponse;
  }
  
  return {
    formData,
    processingAdd,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleDeleteListItem,
    handleAdd,
    clearInputs
  };
}
