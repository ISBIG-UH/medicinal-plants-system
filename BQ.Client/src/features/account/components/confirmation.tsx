import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import OverlayInputError from '../../../components/overlay-input-error';
import { Divider } from 'primereact/divider';
import { MessageServiceContext } from '../../../services/messages';
import { AccountConfirmation } from '../types/authentication';
import useConfirm from '../hooks/use-confirm';
import { NavLink, useSearchParams } from 'react-router';

const schema = Yup.object({
    password: Yup.string()
        .trim()
        .required('Por favor, introduzca su contraseña')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            'La contraseña debe ser segura',
        ),
    passwordConfirmation: Yup.string()
        .trim()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            'La contraseña debe ser segura',
        )
        .required('Por favor, repita su contraseña'),
});

const Confirmation: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState<boolean>(false);

    const user = searchParams.get('user');
    const token = searchParams.get('token');

    const { handleConfirm, loading } = useConfirm();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { messageService } = useContext(MessageServiceContext);

    const onSubmit = async (
        accountConfirmation: Partial<AccountConfirmation>,
    ) => {
        accountConfirmation.token = token!;
        accountConfirmation.userId = user!;

        await handleConfirm(
            accountConfirmation as AccountConfirmation,
            messageService!,
        );
        setSuccess(true);
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
                                        placeholder="Ingrese su contraseña"
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
                            Confirmación
                        </label>
                        <OverlayInputError
                            error={errors.passwordConfirmation?.message}
                        >
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
                                        invalid={
                                            errors.passwordConfirmation != null
                                        }
                                        feedback
                                        header={passwordHeader}
                                        footer={passwordFooter}
                                        weakLabel="Insegura"
                                        strongLabel="Segura"
                                        mediumLabel="Poco segura"
                                        promptLabel="Su contraseña debe ser segura"
                                        toggleMask
                                        placeholder="Confirme su contraseña"
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
                        label="Confirmar"
                    ></Button>
                </div>
            </form>

            {success && (
                <div className="flex flex-col font-quicksand text-secondary">
                    <span className="font-sniglet text-secondary block text-center mb-2">
                        ¡Su cuenta ha sido confirmada con éxito!
                    </span>
                    <div className=" rounded-lg p-2">
                        <p>
                            Una vez su cuenta se aprobada por un administrador
                            podrá iniciar sesión en la plataforma desde&nbsp;
                            <NavLink className="underline" to="/account/login">
                                aquí.
                            </NavLink>
                        </p>
                    </div>
                    <span className="font-sniglet text-secondary block text-center mb-2">
                        ¡Muchas gracias!
                    </span>
                </div>
            )}
        </div>
    );
};

export default Confirmation;
