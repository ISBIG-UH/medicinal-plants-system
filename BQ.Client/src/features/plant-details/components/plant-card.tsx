import React from 'react';
import useAppStore from '../../../hooks/use-app-store';
import { Button } from 'primereact/button';
import { truncateText } from '../../../utils';

interface PlantCardProps {
    monograph: Monograph;
    onClickHandler: () => void;
    onEditHandler: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({
    monograph,
    onClickHandler,
    onEditHandler,
}) => {
    const { appStore } = useAppStore();

    return (
        <div
            onClick={() => {
                onClickHandler();
            }}
            className="w-full border bg-gray-50 shadow-sm border-gray-300 rounded-lg hover:cursor-pointer hover:bg-yellow-50 hover:transition-all ease-in-out duration-300 p-4"
        >
            <div className="flex gap-2">
                <label className="text-2xl font-montserrat text-primary font-semibold hover:cursor-pointer">
                    {monograph.name}
                </label>
                <Button
                    visible={appStore.variables.isEditMode}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditHandler();
                    }}
                    rounded
                    text
                    severity="success"
                    size="small"
                    icon="pi pi-pencil"
                ></Button>
            </div>
            <p className="text-info font-quicksand text-sm">
                {monograph.genus} {monograph.species} {monograph.authors}{' '}
                {monograph.var} {monograph.subsp} {monograph.f}
            </p>
            {monograph.hab?.length > 0 && (
                <p className="font-quicksand">
                    {truncateText(monograph.hab, 150)}
                </p>
            )}
        </div>
    );
};

export default PlantCard;
