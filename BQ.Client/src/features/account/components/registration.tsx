import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import OverlayInputError from '../../../components/overlay-input-error';
import { IUser } from '../types/user';
import useRegister from '../hooks/use-register';
import { MessageServiceContext } from '../../../services/messages';
import { useNavigate } from 'react-router';

const schema = Yup.object({
    firstName: Yup.string().trim().required('Por favor, introduzca su nombre'),
    lastName: Yup.string()
        .trim()
        .required('Por favor, introduzca sus apellidos'),
    email: Yup.string()
        .trim()
        .email('Por favor, introduzca un correo electrónico válido')
        .required('Por favor, introduzca su correo electrónico'),
    organzation: Yup.object(),
});

const Registration: React.FC = () => {
    const [success, setSucces] = useState<boolean>(false);

    const { handleRegister, loading } = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { messageService } = useContext(MessageServiceContext);
    const navigate = useNavigate();

    const onSubmit = async (user: Partial<IUser>) => {
        await handleRegister(user as IUser, messageService!);
        setSucces(true);
    };

    return (
        <div className="border w-full max-w-96 border-gray-300 rounded-lg p-8 mx-8 bg-primary">
            <div className="flex justify-center items-center mb-6 gap-1">
                <img className="w-12" src="/1.png" />
                <h1 className="font-montserrat text-4xl text-secondary">
                    BotaniQ
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} hidden={success}>
                <div className="flex flex-col gap-2 font-quicksand">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="font-sniglet text-secondary block"
                        >
                            Nombre
                        </label>
                        <OverlayInputError error={errors.firstName?.message}>
                            <InputText
                                {...register('firstName')}
                                id="firstName"
                                type="text"
                                className="w-full email"
                                placeholder="Ingrese su nombre"
                                invalid={errors.email != null}
                            />
                        </OverlayInputError>
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="font-sniglet text-secondary block"
                        >
                            Apellidos
                        </label>
                        <OverlayInputError error={errors.firstName?.message}>
                            <InputText
                                {...register('lastName')}
                                id="lastName"
                                type="text"
                                className="w-full email"
                                placeholder="Ingrese sus apellidos"
                                invalid={errors.email != null}
                            />
                        </OverlayInputError>
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="font-sniglet text-secondary block"
                        >
                            Correo electrónico
                        </label>
                        <OverlayInputError error={errors.email?.message}>
                            <InputText
                                {...register('email')}
                                id="email"
                                type="text"
                                className="w-full email"
                                placeholder="Ingrese su correo"
                                invalid={errors.email != null}
                            />
                        </OverlayInputError>
                    </div>

                    <Button
                        loading={loading}
                        severity="secondary"
                        className="mt-4"
                        type="submit"
                        label="Registrarse"
                    ></Button>
                </div>
            </form>

            {success && (
                <div className="flex flex-col font-quicksand text-secondary">
                    <span className="font-sniglet text-secondary block text-center mb-2">
                        ¡Solicitud de registro realizada con éxito!
                    </span>
                    <div className=" rounded-lg p-2">
                        <p>
                            Su solicitud de registro ha sido recibida y enviada
                            a los administradores del sitio.
                            <br />
                            <br />
                            Por favor, espere a que un miembro de la
                            administración lo contacte para completar el proceso
                            de activación de su cuenta.
                        </p>
                    </div>
                    <span className="font-sniglet text-secondary block text-center mb-2">
                        ¡Muchas gracias!
                    </span>
                    <Button
                        severity="secondary"
                        className="mt-4"
                        type="submit"
                        label="Regresar al inicio"
                        onClick={() => navigate('/')}
                    ></Button>
                </div>
            )}
        </div>
    );
};

export default Registration;
