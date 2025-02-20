import { useEffect, useState } from "react";
import { apiGetIndex, apiGetMonograph } from "../services/apiServices";

export const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function useIndexSearchBoard() {
  const [selectedLetter, setSelectedLetter] = useState<string>(letters[0]);
  const [monographBasics, setMonographBasics] = useState<MonographBasic[]>([]);
  const [loading, setLoading] = useState(true);

  const [monograph, setMonograph] = useState<Monograph | null>(null);
  const [openModal, setOpenModal] = useState(false);


  async function getMonograhsByLetter(letter: string) {
    setLoading(true);

    const result = await apiGetIndex({ letter: letter })
    
    setMonographBasics(result.monographsBasics);
    setLoading(false);
  }

  async function handleSelectMonograh(m: MonographBasic) {
    setLoading(true);

    const result = await apiGetMonograph({ id: m.id })

    setMonograph(result.monograph);
    setOpenModal(true);
    setLoading(false);
  }

  function handleSelectLetter(letter: string) {
    setSelectedLetter(letter);
    setLoading(true);
    getMonograhsByLetter(letter);
  }

  useEffect(() => {
    getMonograhsByLetter(letters[0]);
  }, []);

  function reload(){
    getMonograhsByLetter(letters[0]);
  }

  return { selectedLetter, monographBasics, loading, handleSelectLetter, monograph, handleSelectMonograh, openModal, setOpenModal, reload };
}
