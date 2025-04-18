import { Skeleton } from 'primereact/skeleton';

const TextSearchResultPlaceholder: React.FC = () => {
    return (
        <div
            data-testid="text-search-result-placeholder"
            className="border bg-gray-50 shadow-sm border-gray-300 rounded-lg px-4 flex flex-col justify-center flex-1"
        >
            <Skeleton height="15%" className="mb-1" width="30%"></Skeleton>
            <Skeleton height="10%" width="45%"></Skeleton>
            <Skeleton height="40%"></Skeleton>
        </div>
    );
};

export default TextSearchResultPlaceholder;
