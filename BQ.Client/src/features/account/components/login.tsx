import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import OverlayInputError from '../../../components/overlay-input-error';
import useLogin from '../hooks/use-login';
import { LoginRequest } from '../types/authentication';
import useAppStore from '../../../hooks/use-app-store';
import { MessageServiceContext } from '../../../services/messages';

const schema = Yup.object({
    email: Yup.string()
        .trim()
        .email('Por favor, introduzca un correo electrónico válido')
        .required('Por favor, introduzca su correo electrónico'),
    password: Yup.string().required('Por favor, introduzca su contraseña'),
});

const Login: React.FC = () => {
    const { handleLogin, loading } = useLogin();
    const { updateLoginData } = useAppStore();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { messageService } = useContext(MessageServiceContext);

    const navigate = useNavigate();

    const onSubmit = async (loginRequest: LoginRequest) => {
        const loginResult = await handleLogin(loginRequest, messageService!);
        if (loginResult != null) {
            updateLoginData(loginResult.loggedUser, true);
            navigate('/');
        }
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
                                            feedback={false}
                                            toggleMask
                                        />
                                    )}
                                />
                            </OverlayInputError>
                        </div>

                        <Button
                            loading={loading}
                            severity="secondary"
                            className="mt-4"
                            type="submit"
                            label="Iniciar sesión"
                        ></Button>

                        <span className="text-secondary text-sm text-center">
                            Si no tiene cuenta&nbsp;
                            <NavLink
                                className="underline"
                                to="/account/registration"
                            >
                                regístrese aquí
                            </NavLink>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
