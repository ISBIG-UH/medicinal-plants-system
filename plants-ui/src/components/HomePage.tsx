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
  

  const handleSearch = () => {
    const response: ToastResponse = searchTrigger();
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
    <div className="p-4 mx-4 sm:mx-10 md:mx-20 2xl:mx-48 flex-grow">
      <div className="sm:mx-10 md:mx-20 lg:mx-28 xl:mx-32">
        <SearchBar
          input={input}
          setInput={setInput}
          searchTrigger={() => handleSearch()}
        />
      </div>
      <div className="p-2 h-full">
        {!loading && (
          <div className="p-2 h-full">
            <SearchResultsBlock>
              {monographs.length > 0 &&
                monographs.map((monograph, i) => (
                  <SearchResult key={i} monograh={monograph} clickHandler={() => selectMonograph(monograph.Id)} />
                ))}
              {monographs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full pb-20">
                  <div className="p-3">
                    <img className="h-28" src="2.png" />
                  </div>
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
