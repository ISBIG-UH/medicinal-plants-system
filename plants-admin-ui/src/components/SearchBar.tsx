import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  searchTrigger: () => void;
  loading: boolean;
}

function SearchBar({ input, setInput, searchTrigger, loading }: Props) {
  return (
    <div className="flex flex-row">
      <input
        type="text"
        className="p-3 w-full font-quicksand rounded-full mr-2 bg-gray-200 border border-gray-400"
        placeholder="Buscar monografía..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchTrigger();
          }
        }}
      />
      <Button color="success" className="text-secondary font-bold rounded-full items-center" onClick={searchTrigger} disabled={loading} isProcessing={loading} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>
        <FaSearch size={14} />
      </Button>
    </div>
  );
}

export default SearchBar;
