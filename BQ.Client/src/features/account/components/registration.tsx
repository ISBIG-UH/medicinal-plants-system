import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import OverlayInputError from '../../../components/overlay-input-error';
import { IUser } from '../types/user';
import useRegister from '../hooks/use-register';
import { MessageServiceContext } from '../../../services/messages';

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
        const result = await handleRegister(user as IUser, messageService!);
    };

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
                                htmlFor="firstName"
                                className="font-sniglet text-secondary block"
                            >
                                Nombre
                            </label>
                            <OverlayInputError
                                error={errors.firstName?.message}
                            >
                                <InputText
                                    {...register('firstName')}
                                    id="firstName"
                                    type="text"
                                    className="w-full email"
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
                            <OverlayInputError
                                error={errors.firstName?.message}
                            >
                                <InputText
                                    {...register('lastName')}
                                    id="lastName"
                                    type="text"
                                    className="w-full email"
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
            </div>
        </div>
    );
};

export default Registration;
