import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import OverlayInputError from '../../../components/overlay-input-error';
import { classNames } from 'primereact/utils';

interface TextSearchBarProps {
    loading: boolean;
    handleSearch: (data: { query?: string }) => void;
}

const schema = Yup.object({
    query: Yup.string()
        .trim()
        .required('Por favor, ingrese su consulta')
        .min(3, 'La consulta debe tener al menos tres caracteres'),
});

const TextSearchBar: React.FC<TextSearchBarProps> = ({
    loading,
    handleSearch,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <form
            className="flex flex-row gap-2 w-full md:w-[80%] lg:w-[70%]"
            onSubmit={handleSubmit(handleSearch)}
        >
            <OverlayInputError error={errors.query?.message}>
                <input
                    {...register('query')}
                    className={classNames(
                        'p-3 w-full font-quicksand rounded-full mr-2 bg-gray-200 border',
                        {
                            'border-gray-400': errors.query?.message == null,
                            'border-red-700': errors.query?.message != null,
                        },
                    )}
                    id="query"
                    type="text"
                    placeholder="Buscar en monografías..."
                />
            </OverlayInputError>
            <Button
                loading={loading}
                aria-label="Search plants"
                type="submit"
                rounded
                icon="pi pi-search"
            />
        </form>
    );
};

export default TextSearchBar;
