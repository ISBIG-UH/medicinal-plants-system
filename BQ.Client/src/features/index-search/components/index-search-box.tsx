import { ProgressSpinner } from 'primereact/progressspinner';
import { useIndexSearch } from '../hooks/use-index-search';
import { PlantCard, PlantDetails, useGetPlant } from '../../plant-details';
import { useState } from 'react';
import PlantFormDialog from '../../plant-details/components/plant-form-dialog';

const IndexSearchBox: React.FC = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const { selectedLetter, monographBasics, loading, handleSelectLetter } =
        useIndexSearch();
    const { getPlant, monograph, setMonograph, updatePlant } = useGetPlant();
    const [detailsDialogVisible, setDetailsDialogVisible] =
        useState<boolean>(false);
    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false);

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
                <div className="w-full flex flex-col my-4   px-2 md:px-6 overflow-y-auto">
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {!loading &&
                            monographBasics.map((p, i) => (
                                <PlantCard
                                    monograph={p}
                                    onClickHandler={() => {
                                        getPlant(p.id);
                                        setDetailsDialogVisible(true);
                                    }}
                                    onEditHandler={() => {
                                        getPlant(p.id);
                                        setEditDialogVisible(true);
                                    }}
                                    key={i}
                                />
                            ))}
                        {loading && (
                            <div className="self-center mt-32">
                                <ProgressSpinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {monograph && (
                <PlantDetails
                    visible={detailsDialogVisible}
                    onHide={() => {
                        setMonograph(null);
                        setDetailsDialogVisible(false);
                    }}
                    monograph={monograph}
                />
            )}
            {monograph && (
                <PlantFormDialog
                    visible={editDialogVisible}
                    onHide={() => {
                        setMonograph(null);
                        setEditDialogVisible(false);
                    }}
                    monograph={monograph}
                    onSave={(monograph) => {
                        updatePlant(monograph);
                        setMonograph(null);
                        setEditDialogVisible(false);
                    }}
                />
            )}
        </div>
    );
};

export default IndexSearchBox;
