import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import OverlayInputError from '../../../components/overlay-input-error';
import { IUser } from '../types/user';
import { Divider } from 'primereact/divider';
import { MessageServiceContext } from '../../../services/messages';

const schema = Yup.object({
    password: Yup.string()
        .trim()
        .required('Por favor, introduzca su contraseña'),
    passwordConfirmation: Yup.string()
        .trim()
        .required('Por favor, repita su contraseña'),
});

const Confirmation: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { messageService } = useContext(MessageServiceContext);

    const navigate = useNavigate();

    const onSubmit = async (user: Partial<IUser>) => {
        console.log(user);
    };

    const passwordHeader = (
        <div className="font-bold mb-3">Ingrese su contraseña</div>
    );
    const passwordFooter = (
        <>
            <Divider />
            <p className="mt-2">Requerimientos:</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Al menos una mayúscula</li>
                <li>Al menos una minúscula</li>
                <li>Al menos un número</li>
                <li>Al menos 8 caracteres</li>
            </ul>
        </>
    );

    return (
        <div className="flex justify-center items-center h-screen bg-leaf-wall">
            <div className="border w-full max-w-96 border-gray-300 rounded-lg p-8 mx-8 bg-primary">
                <div className="flex justify-center items-center mb-6 gap-1">
                    <img className="w-12" src="/1.png" />
                    <h1 className="font-montserrat text-4xl text-secondary">
                        BotaniQ
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 font-quicksand">
                        <div>
                            <label
                                htmlFor="password"
                                className="font-sniglet text-secondary block"
                            >
                                Contraseña
                            </label>
                            <OverlayInputError error={errors.password?.message}>
                                <Controller
                                    name="password"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => (
                                        <Password
                                            {...field}
                                            id="password"
                                            className="w-full p-password"
                                            inputClassName="w-full password"
                                            invalid={errors.password != null}
                                            feedback
                                            header={passwordHeader}
                                            footer={passwordFooter}
                                            weakLabel="Insegura"
                                            strongLabel="Segura"
                                            mediumLabel="Poco segura"
                                            promptLabel="Su contraseña debe ser segura"
                                            toggleMask
                                        />
                                    )}
                                />
                            </OverlayInputError>
                        </div>

                        <div>
                            <label
                                htmlFor="passwordConfirmation"
                                className="font-sniglet text-secondary block"
                            >
                                Confirme su contraseña
                            </label>
                            <OverlayInputError error={errors.password?.message}>
                                <Controller
                                    name="passwordConfirmation"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => (
                                        <Password
                                            {...field}
                                            id="passwordConfirmation"
                                            className="w-full p-password"
                                            inputClassName="w-full password"
                                            invalid={errors.password != null}
                                            feedback
                                            header={passwordHeader}
                                            footer={passwordFooter}
                                            weakLabel="Insegura"
                                            strongLabel="Segura"
                                            mediumLabel="Poco segura"
                                            promptLabel="Su contraseña debe ser segura"
                                            toggleMask
                                        />
                                    )}
                                />
                            </OverlayInputError>
                        </div>

                        <Button
                            severity="secondary"
                            className="mt-4"
                            type="submit"
                            label="Confirmar"
                        ></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Confirmation;
