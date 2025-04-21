import PlantForm from '../../../features/plant-details/components/plant-form';
import { useGetPlant } from '../../../features/plant-details';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

const PlantFormPage: React.FC = () => {
    const { createPlant } = useGetPlant();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full items-center py-5">
            <p className="text-primary font-montserrat font-bold text-2xl lg:text-4xl pb-2">
                Añadir monografía
            </p>
            <div className="w-[95vw] md:w-[55vw] h-[88%] overflow-y-scroll px-1">
                <PlantForm
                    id={'plant-form'}
                    monograph={{} as Monograph}
                    onSubmitHandler={(monograph) => {
                        createPlant(monograph);
                        navigate('/');
                    }}
                />
            </div>
            <div className="flex gap-2 w-[95vw] md:w-[55vw] justify-end pt-3">
                <Button
                    severity="success"
                    size="small"
                    type="submit"
                    form="plant-form"
                    label="Guardar"
                />
                <Button
                    severity="danger"
                    size="small"
                    label="Cancelar"
                    onClick={() => {
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
};

export default PlantFormPage;
