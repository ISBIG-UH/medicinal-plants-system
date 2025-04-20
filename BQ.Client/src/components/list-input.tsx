/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useFieldArray } from 'react-hook-form';

interface ArrayInputProps {
    name: string;
    control: any;
    register: any;
    placeholder?: string;
}

const ArrayInput: React.FC<ArrayInputProps> = ({
    name,
    control,
    register,
    placeholder,
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });

    return (
        <div>
            <div className="flex flex-col gap-1">
                {fields.map((field, index) => (
                    <div className="flex gap-1" key={field.id}>
                        <InputText
                            key={field.id} // important to include key with field's id
                            {...register(`${name}.${index}`)}
                            placeholder={
                                placeholder ? `${placeholder} ${index + 1}` : ''
                            }
                        />
                        <Button
                            aria-label={`Remove element from ${name}`}
                            type="button"
                            size="small"
                            className="self-center"
                            rounded
                            severity="danger"
                            icon="pi pi-minus"
                            onClick={() => remove(index)}
                        ></Button>
                    </div>
                ))}
                {fields.length == 0 && (
                    <span className="text-md text-gray-400">
                        No se añadirán elementos
                    </span>
                )}
            </div>
            <Button
                aria-label={`Add element to ${name}`}
                className="m-2"
                size="small"
                type="button"
                rounded
                severity="success"
                onClick={() => append('')}
                icon="pi pi-plus"
            />
        </div>
    );
};

export default ArrayInput;
