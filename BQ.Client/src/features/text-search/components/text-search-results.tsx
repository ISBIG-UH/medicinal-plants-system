import React from 'react';
import TextSearchResultPlaceholder from './text-search-result-placeholder';
import { useMediaQuery } from '@react-hook/media-query';
import { PlantCard } from '../../plant-details';

interface TextSearchResultsProps {
    loading: boolean;
    monographs: Monograph[];
    onSelectMonograph: (monograph: Monograph) => void;
    onEditMonograph: (monograph: Monograph) => void;
    onDeleteMonograph: (monograph: Monograph) => void;
}

const TextSearchResults: React.FC<TextSearchResultsProps> = React.memo(
    ({
        loading,
        monographs,
        onSelectMonograph,
        onEditMonograph,
        onDeleteMonograph,
    }) => {
        const isMobile = useMediaQuery('(max-width: 768px)');

        const LoadingTemplate: React.FC = () => (
            <div className="h-full flex flex-col items-stretch gap-3">
                <TextSearchResultPlaceholder />
                <TextSearchResultPlaceholder />
                <TextSearchResultPlaceholder />
                <TextSearchResultPlaceholder />
                {!isMobile && <TextSearchResultPlaceholder />}
            </div>
        );

        const EmptyTemplate: React.FC = () => (
            <div className="flex h-full justify-center items-center">
                <div>
                    <img src="/2.png" className="scale-75"></img>
                </div>
            </div>
        );

        const ResultsTemplate: React.FC = () => (
            <div className="flex flex-col gap-3 w-full">
                {monographs.map((m, k) => (
                    <PlantCard
                        monograph={m}
                        onClickHandler={() => onSelectMonograph(m)}
                        onEditHandler={() => onEditMonograph(m)}
                        onDeleteHandler={() => onDeleteMonograph(m)}
                        key={k}
                    />
                ))}
            </div>
        );

        return (
            <div className="grow overflow-y-scroll w-full">
                {loading && <LoadingTemplate />}
                {!loading && monographs.length == 0 && <EmptyTemplate />}
                {!loading && monographs.length > 0 && <ResultsTemplate />}
            </div>
        );
    },
);
export default TextSearchResults;
