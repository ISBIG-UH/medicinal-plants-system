import { Spinner } from "flowbite-react";
import { letters, useIndexSearchBoard } from "../hooks/useIndexSearchBoard";
import EditMonographModal from "./EditMonographModal";

function IndexSearchBoard() {
  const { selectedLetter, plants, loading, handleSelectLetter, monograph, handleSelectMonograh, openModal, setOpenModal } = useIndexSearchBoard();
  
  return (
    <div className="h-full">
      <div className="flex lg:flex-col h-full">
        <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:justify-center p-4 bg-gray-100 rounded-r-3xl rounded-b-3xl shadow-xl">
          {letters.map((letter) => (
            <button
              key={letter}
              disabled={loading}
              onClick={() => handleSelectLetter(letter)}
              className={`disabled text-xl lg:text-lg font-bold px-2 rounded-full transition-all duration-125 ${
                selectedLetter === letter
                  ? "text-green-500 scale-125 bg-gray-200"
                  : "text-gray-700"
              } hover:bg-gray-200 disabled:opacity-50`}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="w-full flex flex-col my-4 lg:h-full lg:overflow-y-scroll">
          <h2 className="text-center text-3xl font-bold text-primary mb-4">
            "{selectedLetter}"
          </h2>
          {!loading &&
            plants.map((p, i) => (
              <div key={i} className="mx-6">
                <p
                  className={`mx-2 text-xl font-semibold text-primary hover:underline hover:cursor-pointer rounded-full px-4 py-1 ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  }`}
                  onClick={() => handleSelectMonograh(p)}
                >
                  {p.Name}
                </p>
              </div>
            ))}
          {loading && (
            <div className="self-center mt-32">
              <Spinner className="h-16 w-16" color="success" />
            </div>
          )}
        </div>
      </div>

      {monograph && (
        <EditMonographModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          monograph={monograph}
        />
      )}
    </div>
  );
}

export default IndexSearchBoard;