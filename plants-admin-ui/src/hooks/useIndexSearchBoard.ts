import { useEffect, useState } from "react";
import { monographsSeed } from "../seed";

export const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function useIndexSearchBoard() {
  const [selectedLetter, setSelectedLetter] = useState<string>(letters[0]);
  const [monographBasics, setMonographBasics] = useState<MonographBasic[]>([]);
  const [loading, setLoading] = useState(true);

  const [monograph, setMonograph] = useState<Monograph | null>(null);
  const [openModal, setOpenModal] = useState(false);


  function getMonograhsByLetter(letter: string) {
    console.log("called");

    setLoading(true);

    // Simulate data request to backend
    setTimeout(() => {

      const result = generateRandomWords(letter);
      // Dada una letra, pido al servidor las plantas que empiezan con esa letra
      //////////////////////////////////////////////////
      //////// 🚨🚨Implementar solicitud🚨🚨 /////////
      ////////////////////////////////////////////////

      setMonographBasics(result);
      setLoading(false);
    }, 500);
  }

  function handleSelectMonograh(m: MonographBasic) {
    setLoading(true);

    // Simulate data request to backend
    setTimeout(() => {

      const result = monographsSeed[m.Id];
      // Dado un id que me dio el servidor cuando cargué las plantas, pido la monografía completa
      //////////////////////////////////////////////////
      //////// 🚨🚨Implementar solicitud🚨🚨 /////////
      ////////////////////////////////////////////////

      setMonograph(result);
      setOpenModal(true);
      setLoading(false);
    }, 500);
  }

  function handleSelectLetter(letter: string) {
    console.log("selecting letter");
    setSelectedLetter(letter);
    setLoading(true);
    getMonograhsByLetter(letter);
  }

  useEffect(() => {
    getMonograhsByLetter(letters[0]);
  }, []);

  return { selectedLetter, plants: monographBasics, loading, handleSelectLetter, monograph, handleSelectMonograh, openModal, setOpenModal };
}


const generateRandomWords = (letter: string) => {
  const words: string[] = [];
  const characters = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 40; i++) {
    const wordLength = Math.floor(Math.random() * 7) + 3; // Longitud de palabra entre 3 y 10
    let word = letter.toLowerCase();

    for (let j = 1; j < wordLength; j++) {
      word += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    words.push(word.charAt(0).toUpperCase() + word.slice(1)); // Capitaliza la primera letra
  }

  return words.map((w, i) => ({ Id: i, Name: w }));
};