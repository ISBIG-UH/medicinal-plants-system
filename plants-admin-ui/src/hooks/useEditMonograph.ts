import { useState } from "react";
import { apiEditMonograph } from "../services/apiServices";
import { useFormData } from "./useFormData";

export function useEditMonograph(
  monograph: Monograph,
  setOpenModal: (x: boolean) => void
) {
  const {
    formData,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleDeleteListItem,
  } = useFormData({
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

  const [processingEdit, setProcessingEdit] = useState(false);

  async function submit(): Promise<ToastResponse> {
    setProcessingEdit(true);
    const response = await apiEditMonograph({ formData: formData });
    setProcessingEdit(false);
    setOpenModal(false);
    return response.toastResponse;
  }

  return {
    formData,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleDeleteListItem,
    submit,
    processingEdit,
  };
}
