import { useState } from "react";

export function usePreview(monographs: Monograph[]) {
  const [selectedMonograph, setSelectedMonograph] = useState<Monograph | null>(
    null
  );

  function closeModal() {
    setSelectedMonograph(null);
  }

  function selectMonograph(id: number){
    const monograph = monographs.find(monograph => monograph.id === id)
    if(monograph){
      setSelectedMonograph(monograph)
    }
  }

  return { selectedMonograph, setSelectedMonograph, closeModal, selectMonograph };
}
