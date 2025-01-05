import { useState } from "react";
import { apiDeleteMonograph } from "../services/apiServices";

export function useDeleteMonograph(monograph: Monograph, setOpenModal: (x: boolean) => void) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [processingDelete, setProcessingDelete] = useState(false);


  async function delete_() : Promise<ToastResponse> {
    const id = monograph.id;
    setProcessingDelete(true);

    const response = await apiDeleteMonograph({ id: id })

    setProcessingDelete(false);
    setConfirmationOpen(false);
    setOpenModal(false);
    return response.toastResponse;
  }

  function handleConfirmation() {
    setConfirmationOpen(true);
  }

  return { handleConfirmation, delete_, confirmationOpen, setConfirmationOpen, processingDelete };
}
