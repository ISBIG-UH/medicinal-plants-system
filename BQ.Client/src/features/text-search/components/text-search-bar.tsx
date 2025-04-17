import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';

interface TextSearchBarProps {
    loading: boolean;
    handleSearch: (data: { query?: string }) => void;
}

const TextSearchBar: React.FC<TextSearchBarProps> = ({
    loading,
    handleSearch,
}) => {
    const { register, handleSubmit } = useForm();

    return (
        <form
            className="flex flex-row w-full md:w-[80%] lg:w-[70%]"
            onSubmit={handleSubmit(handleSearch)}
        >
            <input
                {...register('query')}
                id="query"
                type="text"
                className="p-3 w-full font-quicksand rounded-full mr-2 bg-gray-200 border border-gray-400"
                placeholder="Buscar en monografías..."
            />
            <Button
                loading={loading}
                type="submit"
                rounded
                icon="pi pi-search"
            />
        </form>
    );
};

export default TextSearchBar;
