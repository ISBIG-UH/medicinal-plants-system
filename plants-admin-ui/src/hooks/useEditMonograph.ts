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
    hab: monograph.hab,
    des: monograph.des,
    cmp: monograph.cmp,
    use: monograph.use,
    pro: monograph.pro,
    cul: monograph.cul,
    app: monograph.app,
    sy: monograph.sy,
    vul: monograph.vul,
    bib: monograph.bib,
  });

  const [processingEdit, setProcessingEdit] = useState(false);

  async function submit(id: number): Promise<ToastResponse> {
    setProcessingEdit(true);
    const response = await apiEditMonograph({ formData: formData, id: id });
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
