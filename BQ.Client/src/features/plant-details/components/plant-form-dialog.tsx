import { Dialog } from 'primereact/dialog';
import PlantForm from './plant-form';
import { Button } from 'primereact/button';

interface PlantFormDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: (monograph: Monograph) => void;
    monograph: Monograph;
}

const PlantFormDialog: React.FC<PlantFormDialogProps> = ({
    visible,
    onHide,
    monograph,
    onSave,
}) => {
    const headerElement = (
        <div>
            <p className="text-primary font-montserrat font-bold text-2xl lg:text-4xl">
                Editar monografía
            </p>
        </div>
    );

    const footerElement = (
        <div className="pt-3 flex gap-2">
            <Button
                size="small"
                severity="success"
                label="Guardar"
                form="plant-form"
                type="submit"
            />
            <Button
                size="small"
                severity="danger"
                label="Cancelar"
                onClick={onHide}
            />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            style={{ width: '50vw' }}
            contentStyle={{ height: '75vh' }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            onHide={onHide}
            resizable={false}
            header={headerElement}
            footer={footerElement}
        >
            <PlantForm
                monograph={monograph}
                id={'plant-form'}
                onSubmitHandler={onSave}
            />
        </Dialog>
    );
};

export default PlantFormDialog;
