import { useState } from "react";
import { apiDeleteMonograph } from "../services/apiServices";

export function useDeleteMonograph(monograph: Monograph, setOpenModal: (x: boolean) => void) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  async function delete_() {
    const id = monograph.id;

    const response = await apiDeleteMonograph({ id: id })

    setConfirmationOpen(false);
    setOpenModal(false);
    return response.toastResponse;
  }

  function handleConfirmation() {
    setConfirmationOpen(true);
  }

  return { handleConfirmation, delete_, confirmationOpen, setConfirmationOpen };
}
