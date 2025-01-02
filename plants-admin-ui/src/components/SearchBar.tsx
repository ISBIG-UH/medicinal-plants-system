import { FaSearch } from "react-icons/fa";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  searchTrigger: () => void;
}

function SearchBar({ input, setInput, searchTrigger }: Props) {
  return (
    <div className="flex flex-row">
      <input
        type="text"
        className="p-3 w-full rounded-full mr-2 bg-gray-200 border border-gray-400"
        placeholder="Buscar monografía..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchTrigger();
          }
        }}
      />
      <button className="bg-primary text-secondary font-bold py-2 px-4 rounded-full hover:bg-green-700" onClick={searchTrigger}>
        <FaSearch size={18} />
      </button>
    </div>
  );
}

export default SearchBar;
