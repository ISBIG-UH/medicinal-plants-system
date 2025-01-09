import { Button } from "flowbite-react";
import { FaSearch } from "react-icons/fa";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  searchTrigger: () => void;
  disable: boolean;
}

function SearchBar({ input, setInput, searchTrigger, disable }: Props) {
  return (
    <form className="flex flex-row" onSubmit={(e) => {e.preventDefault();searchTrigger();}}>
      <input
        type="text"
        className="p-3 w-full rounded-full mr-2 bg-gray-200 border border-gray-400"
        placeholder="Buscar..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disable}
      />
      <Button className="bg-primary w-14 text-secondary font-bold py-2 px-4 rounded-full hover:bg-green-700" disabled={disable} onClick={searchTrigger}>
        <FaSearch size={18} />
      </Button>
    </form>
  );
}

export default SearchBar;
