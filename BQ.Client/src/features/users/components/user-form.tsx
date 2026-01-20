import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import OverlayInputError from '../../../components/overlay-input-error';
import { IUser } from '../../../types/user';
import { MessageServiceContext } from '../../../services/messages';
import { useNavigate } from 'react-router';

const schema = Yup.object({
    firstName: Yup.string().trim().required('Por favor, introduzca el nombre'),
    lastName: Yup.string()
        .trim()
        .required('Por favor, introduzca los apellidos'),
    email: Yup.string()
        .trim()
        .email('Por favor, introduzca un correo electrónico válido')
        .required('Por favor, introduzca un correo electrónico'),
    phoneNumber: Yup.string().trim(),
});

const UserForm: React.FC = () => {
    const [success, setSucces] = useState<boolean>(false);

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
        console.log(user);
        setSucces(true);
    };

    return (
        <div className="border w-full max-w-96 border-gray-300 rounded-lg p-8 mx-8">
            <form onSubmit={handleSubmit(onSubmit)} hidden={success}>
                <div className="flex flex-col gap-2 font-quicksand">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="font-sniglet text-primary block"
                        >
                            Nombre
                        </label>
                        <OverlayInputError error={errors.firstName?.message}>
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
                            className="font-sniglet text-primary block"
                        >
                            Apellidos
                        </label>
                        <OverlayInputError error={errors.firstName?.message}>
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
                            className="font-sniglet text-primary block"
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

                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="font-sniglet text-primary block"
                        >
                            Teléfono
                        </label>
                        <OverlayInputError error={errors.firstName?.message}>
                            <InputText
                                {...register('phoneNumber')}
                                id="phoneNumber"
                                type="text"
                                className="w-full email"
                                invalid={errors.email != null}
                            />
                        </OverlayInputError>
                    </div>

                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="font-sniglet text-primary block"
                        >
                            Roles
                        </label>
                        <OverlayInputError error={errors.firstName?.message}>
                            <InputText
                                {...register('phoneNumber')}
                                id="phoneNumber"
                                type="text"
                                className="w-full email"
                                invalid={errors.email != null}
                            />
                        </OverlayInputError>
                    </div>

                    {/* <Button
                        loading={loading}
                        severity="secondary"
                        className="mt-4"
                        type="submit"
                        label="Registrarse"
                    ></Button> */}
                </div>
            </form>
        </div>
    );
};

export default UserForm;
