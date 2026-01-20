import { Controller, useForm } from 'react-hook-form';
import { DetailsSection, OverlayInputError } from '../../../components';
import { PiPlant } from 'react-icons/pi';
import { TbAbc } from 'react-icons/tb';
import { InputText } from 'primereact/inputtext';
import { TbTournament } from 'react-icons/tb';
import { FloatLabel } from 'primereact/floatlabel';
import { HiMiniBeaker } from 'react-icons/hi2';
import {
    FaBriefcaseMedical,
    FaEquals,
    FaHandHoldingMedical,
    FaList,
} from 'react-icons/fa';
import { MdForest } from 'react-icons/md';
import { PiTreeFill } from 'react-icons/pi';
import { PiPlantBold } from 'react-icons/pi';
import { ImBooks, ImLeaf } from 'react-icons/im';
import { InputTextarea } from 'primereact/inputtextarea';
import ArrayInput from '../../../components/list-input';

interface PlantFormProps {
    id: string;
    monograph: Monograph;
    onSubmitHandler: (monograph: Monograph) => void;
}

const PlantForm: React.FC<PlantFormProps> = ({
    id,
    monograph,
    onSubmitHandler,
}) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: monograph,
    });

    return (
        <form id={id} onSubmit={handleSubmit(onSubmitHandler)}>
            <DetailsSection name={'Nombre común'} icon={<PiPlant />}>
                <div className="py-4">
                    <OverlayInputError error={errors.name?.message}>
                        <InputText
                            {...register('name', {
                                required:
                                    'El nombre común de la planta es requerido',
                            })}
                            id="name"
                            invalid={errors.name != null}
                            type="text"
                            className="w-full"
                        />
                    </OverlayInputError>
                </div>
            </DetailsSection>
            <DetailsSection
                name={'Nombre científico'}
                icon={<TbAbc size={17} />}
            >
                <div className="grid gap-x-2 gap-y-6 grid-cols-2 md:grid-cols-3 py-4">
                    <OverlayInputError error={errors.genus?.message}>
                        <FloatLabel>
                            <Controller
                                name="genus"
                                control={control}
                                rules={{
                                    required:
                                        'El género de la planta es requerido',
                                }}
                                render={({ field }) => (
                                    <InputText
                                        {...field}
                                        invalid={errors.genus != null}
                                        type="text"
                                        className="w-full"
                                    />
                                )}
                            />

                            <label htmlFor="genus">Género</label>
                        </FloatLabel>
                    </OverlayInputError>
                    <OverlayInputError error={errors.species?.message}>
                        <FloatLabel>
                            <Controller
                                name="species"
                                control={control}
                                rules={{
                                    required:
                                        'La especie de la planta es requerida',
                                }}
                                render={({ field }) => (
                                    <InputText
                                        {...field}
                                        invalid={errors.species != null}
                                        type="text"
                                        className="w-full"
                                    />
                                )}
                            />
                            <label htmlFor="species">Especie</label>
                        </FloatLabel>
                    </OverlayInputError>
                    <FloatLabel>
                        <Controller
                            name="authors"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    type="text"
                                    className="w-full"
                                />
                            )}
                        />
                        <label htmlFor="authors">Autor(es)</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Controller
                            name="subsp"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    type="text"
                                    className="w-full"
                                />
                            )}
                        />
                        <label htmlFor="subsp">Subespecie</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Controller
                            name="var"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    type="text"
                                    className="w-full"
                                />
                            )}
                        />
                        <label htmlFor="var">Variedad</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Controller
                            name="f"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    type="text"
                                    className="w-full"
                                />
                            )}
                        />
                        <label htmlFor="f">Forma</label>
                    </FloatLabel>
                </div>
            </DetailsSection>
            <DetailsSection name={'Taxonomía'} icon={<TbTournament />}>
                <div className="grid gap-x-2 gap-y-6 grid-cols-2 md:grid-cols-3 py-4">
                    <FloatLabel>
                        <Controller
                            name="family"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    type="text"
                                    className="w-full"
                                />
                            )}
                        />
                        <label htmlFor="family">Familia</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Controller
                            name="subfamily"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    type="text"
                                    className="w-full"
                                />
                            )}
                        />
                        <label htmlFor="subfamily">Subfamilia</label>
                    </FloatLabel>
                </div>
            </DetailsSection>
            <DetailsSection name={'Hábitat y distribución'} icon={<MdForest />}>
                <div className="flex flex-col py-4">
                    <InputTextarea
                        {...register('hab')}
                        id="hab"
                        autoResize
                        className="w-full"
                        placeholder="La planta se encuentra en ..."
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Descripción botánica'} icon={<PiTreeFill />}>
                <div className="flex flex-col py-4">
                    <InputTextarea
                        {...register('des')}
                        id="des"
                        autoResize
                        className="w-full"
                        placeholder="Planta que presenta ..."
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Composición'} icon={<HiMiniBeaker />}>
                <div className="flex flex-col py-4">
                    <InputTextarea
                        {...register('des')}
                        id="cmp"
                        autoResize
                        className="w-full"
                        placeholder="Planta compuesta por ..."
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Partes empleadas'} icon={<ImLeaf />}>
                <div className="flex flex-col py-4">
                    <InputTextarea
                        {...register('use')}
                        id="use"
                        autoResize
                        className="w-full"
                        placeholder="Las hojas ..."
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Propiedades'} icon={<FaBriefcaseMedical />}>
                <div className="flex flex-col py-4">
                    <InputTextarea
                        {...register('pro')}
                        id="pro"
                        autoResize
                        className="w-full"
                        placeholder="Esta planta es ..."
                    />
                </div>
            </DetailsSection>
            <DetailsSection
                name={'Aplicaciones'}
                icon={<FaHandHoldingMedical />}
            >
                <div className="flex flex-col py-4">
                    <InputTextarea
                        {...register('app')}
                        id="app"
                        autoResize
                        className="w-full"
                        placeholder="La planta es utilizada como ..."
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Cultivo'} icon={<PiPlantBold />}>
                <div className="flex flex-col py-4">
                    <InputTextarea
                        {...register('cul')}
                        id="cul"
                        autoResize
                        className="w-full"
                        placeholder="La planta crece mejor ..."
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Sinónimos'} icon={<FaEquals />}>
                <div className="flex flex-col py-4">
                    <ArrayInput
                        name="sy"
                        control={control}
                        register={register}
                        placeholder="Sinónimo"
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Otros nombres vulgares'} icon={<FaList />}>
                <div className="flex flex-col py-4">
                    <ArrayInput
                        name="vul"
                        control={control}
                        register={register}
                        placeholder="Nombre"
                    />
                </div>
            </DetailsSection>
            <DetailsSection name={'Bibliografía'} icon={<ImBooks />}>
                <div className="flex flex-col py-4">
                    <ArrayInput
                        name="bib"
                        control={control}
                        register={register}
                        placeholder="Referencia"
                    />
                </div>
            </DetailsSection>
        </form>
    );
};

export default PlantForm;
