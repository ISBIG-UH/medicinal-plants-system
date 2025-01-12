import { useState } from "react";
import { searchQuery } from "../services/apiServices";

function useSearch() {
  const [input, setInput] = useState("");
  const [monographs, setMonographs] = useState<Monograph[]>([]);
  const [loading, setLoading] = useState(false);


  async function searchTrigger() {
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

    console.log(`Search started: ${input}`);
    setLoading(true);

    const response = await searchQuery(input);
    setMonographs(response);

    console.log("Search ended");
    setLoading(false)

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
