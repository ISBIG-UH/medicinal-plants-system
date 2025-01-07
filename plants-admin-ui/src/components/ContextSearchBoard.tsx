import { toast } from "react-toastify";
import useSearch from "../hooks/useSearch";
import SearchBar from "./SearchBar";
import { Spinner } from "flowbite-react";
import EditPlantModal from "./EditMonographModal";
import { useContextSearchBoard } from "../hooks/useContextSearchBoard";

function ContextSearchBoard() {
  const { input, setInput, monographs, loading, searchTrigger } = useSearch();
  const { selectedMonograph, openModal, setOpenModal, handleClick } = useContextSearchBoard();

  const handleSearch = async () => {
    const response: ToastResponse = await searchTrigger();

    if (response.type == "error") {
      toast.error(response.msg);
    } else if (response.type == "success") {
      toast.success(response.msg);
    } else if (response.type == "null") {
      return;
    }
  };

  return (
    <>
      <div className="m-4 px-2 sm:px-12 md:px-24 lg:px-36 xl:px-56">
        <SearchBar input={input} setInput={setInput} searchTrigger={() => handleSearch()} loading={loading} />
      </div>
      
      <div className="flex-grow lg:overflow-y-scroll lg:max-h-full lg:h-full">
        <ul className={`flex flex-col flex-grow items-center mb-12`}>

          {!loading && monographs.map((monograph) => (
            <li key={monograph.id} className="w-full px-4">
              <div className="p-1 w-full">
                <div className="bg-gray-100 border border-gray-200 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md sm:mx-8 md:mx-14 lg:mx-24 xl:mx-32 max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
                  onClick={() => handleClick(monograph)}
                >
                  <p className="text-xl truncate">{monograph.name}</p>
                  <p className="text-info text-sm truncate">
                  {monograph.genus} {monograph.species} {monograph.authors}{" "}
                  {monograph.var} {monograph.subsp} {monograph.f}
                  </p>
                  <p className="text-sm truncate">{monograph.Des}</p>
                </div>
              </div>
            </li>
          ))}

          {loading && <Spinner className="w-16 h-16 mt-10" color="success"/>}

        </ul>
      </div>

      {selectedMonograph && <EditPlantModal key={selectedMonograph.id} monograph={selectedMonograph} openModal={openModal} setOpenModal={(x: boolean) => {setOpenModal(x)}} />}
    </>
  );
}

export default ContextSearchBoard;
