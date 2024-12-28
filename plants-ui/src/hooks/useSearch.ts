import { useState } from "react";
import { monographsSeed } from "../components/seed";

function useSearch() {
  const [input, setInput] = useState("");
  const [monographs, setMonographs] = useState<Monograph[]>([]);
  const [loading, setLoading] = useState(false);

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
      setMonographs(monographsSeed);
      setLoading(false)
      console.log("Search ended: Results updated.");
    }, 3000);

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
