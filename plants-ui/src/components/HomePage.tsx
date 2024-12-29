import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchResultsBlock from "./SearchResultsBlock";
import useSearch from "../hooks/useSearch";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./Spinner";

function HomePage() {
  const { input, setInput, monographs, loading, searchTrigger } = useSearch();

  const handleSearch = () => {
    const response: ToastResponse = searchTrigger();

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
                monographs.map((monograph) => (
                  <SearchResult key={monograph.Sc.raw} monograh={monograph} />
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
        {loading && <Spinner />}
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
