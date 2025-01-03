import { useState } from "react";

export function useDeleteMonograph(monograph: Monograph, setOpenModal: (x: boolean) => void) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  function handleDelete() {
    const id = monograph.Id;

    // Delete monograph
    //////////////////////////////////////////////////
    //////// 🚨🚨Implementar solicitud🚨🚨 /////////
    ////////////////////////////////////////////////

    setConfirmationOpen(false);
    setOpenModal(false);
    console.log(`Deleting monograph with id: ${id}`);
  }

  function handleConfirmation() {
    setConfirmationOpen(true);
  }

  return { handleConfirmation, handleDelete, confirmationOpen, setConfirmationOpen };
}
