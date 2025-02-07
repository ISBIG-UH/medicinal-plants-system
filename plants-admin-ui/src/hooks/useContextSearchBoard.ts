import { useState } from "react";

export function useContextSearchBoard() {
    const [selectedMonograph, setSelectedMonograph] = useState<Monograph | null>(null);
    const [openModal, setOpenModal] = useState(false);

    function handleClick(monograph: Monograph) {
        setSelectedMonograph(monograph);
        setOpenModal(true);
        console.log("Monograph selected: ", monograph);
    }
  
    return {
        selectedMonograph, setOpenModal, openModal, handleClick
    };
}