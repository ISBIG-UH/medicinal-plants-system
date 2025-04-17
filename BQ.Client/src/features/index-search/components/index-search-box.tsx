import { ProgressSpinner } from 'primereact/progressspinner';
import { useIndexSearch } from '../hooks/use-index-search';

const IndexSearchBox: React.FC = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const { selectedLetter, monographBasics, loading, handleSelectLetter } =
        useIndexSearch();
    return (
        <div className="flex lg:flex-col h-full">
            <div className="overflow-x-scroll flex flex-col space-y-2 overflow-y-auto lg:space-y-0 lg:flex-row lg:justify-center p-4 bg-gray-100  lg:rounded-b-3xl shadow-xl">
                {letters.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleSelectLetter(letter)}
                        className={`disabled font-montserrat text-xl lg:text-lg font-bold px-2 rounded-full transition-all duration-125 ${
                            selectedLetter === letter
                                ? 'text-primary scale-125 bg-gray-200'
                                : 'text-gray-700'
                        } hover:bg-gray-200 disabled:opacity-50`}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <div className="h-full w-full lg:h-[90%] flex flex-col ">
                <div className="pb-1 pt-2">
                    <h2 className="text-center text-3xl font-montserrat font-bold text-primary">
                        "{selectedLetter}"
                    </h2>
                </div>
                <div className="w-full flex flex-col my-4 gap-2 lg:h-full overflow-y-auto px-2 md:px-6">
                    {!loading &&
                        monographBasics.map((p, i) => (
                            <div
                                key={i}
                                className={`${i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} rounded-xl p-2 px-6`}
                            >
                                <span
                                    className={`mx-2 w-fit text-xl font-quicksand font-semibold text-primary hover:underline hover:cursor-pointer `}
                                >
                                    {p.name}
                                </span>
                                <span className="text-info font-quicksand text-sm">
                                    <br />
                                    {p.genus} {p.species} {p.authors}
                                </span>
                            </div>
                        ))}
                    {loading && (
                        <div className="self-center mt-32">
                            <ProgressSpinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IndexSearchBox;
