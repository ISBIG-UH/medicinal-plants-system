import { useState } from "react";
import { monographsSeed } from "../seed";

function useSearch() {
  const [input, setInput] = useState("");
  const [monographs, setMonographs] = useState<Monograph[]>([]);
  const [loading, setLoading] = useState(false);


  ///////////////////////////// For temporal use /////////////////////////////
  function getRandomSubset(monographs: Monograph[], subsetSize: number): Monograph[] {
    if (subsetSize < 0) {
      throw new Error("El tamaño del subconjunto no puede ser negativo.");
    }
  
    if (subsetSize > monographs.length) {
      throw new Error("El tamaño del subconjunto no puede ser mayor que la longitud de la lista.");
    }
  
    const shuffled = [...monographs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
  
    return shuffled.slice(0, subsetSize);
  }
  ///////////////////////////////////////////////////////////////////////////////////////


  function searchTrigger() {
    const trimmed = input.trim();

    if (!trimmed) {
      console.error("El campo de búsqueda está vacío.");
      return { type: "error", msg: "El campo de búsqueda está vacío." };
    }

    if (trimmed.length < 3) {
      console.error("La búsqueda debe tener al menos 3 caracteres.");
      return {
        type: "error",
        msg: "La búsqueda debe tener al menos 3 caracteres.",
      };
    }

    console.log(`Search started: ${trimmed}`);
    setLoading(true);

    // Simulate data request to backend
    setTimeout(() => {
      const subset = getRandomSubset(monographsSeed, 3);
      setMonographs(subset);
      setLoading(false)
      console.log("Search ended: Results updated.");
    }, 500);

    return { type: "null", msg: '' };
  }

  return {
    input,
    setInput,
    monographs,
    loading,
    searchTrigger,
  };
}

export default useSearch;
