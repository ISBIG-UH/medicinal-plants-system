import { useState } from 'react';
import { PlantDetails, useGetPlant } from '../../plant-details';
import useTextSearch from '../hooks/use-text-search';
import TextSearchBar from './text-search-bar';
import TextSearchResults from './text-search-results';
import PlantFormDialog from '../../plant-details/components/plant-form-dialog';

const TextSearchBox: React.FC = () => {
    const { loading, monographs, handleSearch } = useTextSearch();
    const { monograph, getPlant, updatePlant } = useGetPlant();
    const [detailsDialogVisible, setDetailsDialogVisible] =
        useState<boolean>(false);
    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false);

    return (
        <div className="h-full w-full p-2 flex flex-col gap-6 items-center">
            <TextSearchBar
                loading={loading}
                handleSearch={handleSearch}
            ></TextSearchBar>
            <TextSearchResults
                loading={loading}
                monographs={monographs}
                onSelectMonograph={(monograph) => {
                    setDetailsDialogVisible(true);
                    getPlant(monograph.id);
                }}
                onEditMonograph={(monograph) => {
                    setEditDialogVisible(true);
                    getPlant(monograph.id);
                }}
            />
            {monograph != null && (
                <PlantDetails
                    visible={detailsDialogVisible}
                    onHide={() => {
                        setDetailsDialogVisible(false);
                    }}
                    monograph={monograph!}
                ></PlantDetails>
            )}
            {monograph != null && (
                <PlantFormDialog
                    visible={editDialogVisible}
                    onHide={() => {
                        setEditDialogVisible(false);
                    }}
                    onSave={(monograph: Monograph) => {
                        updatePlant(monograph);
                        setEditDialogVisible(false);
                    }}
                    monograph={monograph!}
                ></PlantFormDialog>
            )}
        </div>
    );
};

export default TextSearchBox;
