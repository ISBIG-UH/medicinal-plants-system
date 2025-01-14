import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchResultsBlock from "./SearchResultsBlock";
import useSearch from "../hooks/useSearch";
import { toast, ToastContainer } from "react-toastify";
import PreviewModal from "./PreviewModal";
import { usePreview } from "../hooks/usePreview";
import { Spinner } from "flowbite-react";


function HomePage() {
  const { input, setInput, monographs, loading, searchTrigger } = useSearch();
  const { selectedMonograph, closeModal, selectMonograph } = usePreview(monographs);
  

  const handleSearch = async () => {
    const response: ToastResponse = await searchTrigger();
    closeModal();



    if (response.type == "error") {
      toast.error(response.msg);
    } else if (response.type == "success") {
      toast.success(response.msg);
    } else if (response.type == "null") {
      return;
    }
  };

  return (
    <div className="py-4 h-full">
      <div className="p-2 px-6 sm:px-20 md:px-36 lg:px-48 xl:px-64 2xl:px-96">
        <SearchBar
          input={input}
          setInput={setInput}
          searchTrigger={() => handleSearch()}
          disable={loading}
        />
      </div>
      <div className={`p-2 px-4 sm:px-12 md:px-32 lg:px-42 xl:px-48 h-full ${monographs.length > 0 ? "overflow-y-auto" : ""}`}>
        {!loading && (
          <div className="p-2 h-full">
            <SearchResultsBlock>
              {monographs.length > 0 &&
                monographs.map((monograph, i) => (
                  <SearchResult key={i} monograh={monograph} clickHandler={() => selectMonograph(monograph.id)} />
                ))}
              {monographs.length === 0 && (
                <div className="flex justify-center items-center py-20">
                  <img className="h-28 w-28" src="2.png" />
                </div>
              )}
            </SearchResultsBlock>
          </div>
        )}

        {selectedMonograph && <PreviewModal show={selectedMonograph !== null} setShow={closeModal} monograph={selectedMonograph} />}

        {loading && <div className="h-full flex flex-col justify-center items-center"><Spinner color="success" className="h-16 w-16" /></div>}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </div>
    </div>
  );
}

export default HomePage;
