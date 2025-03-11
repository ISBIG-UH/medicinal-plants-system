import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { LoginComponentStore, LoginValidationResult } from "./LoginComponentStore";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import OverlayError from "../../components/OverlayError";

const LoginComponent: React.FC = () => {
    const location = useLocation();
    // TODO: place the routes into a constants file
    const isConfirmation = location.pathname === "/account/confirmation";
    const store = new LoginComponentStore(isConfirmation);

    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        store.updateLoginField(name, value);
    };

    const onSubmitHandler = (e:any) => {
        store.handleLogin();
    };

    const onInvalidHandler = (e: any) => {
        (e.target as HTMLInputElement)
            .setCustomValidity(store.loginValidationResult[e.target.name as keyof LoginValidationResult])
    }

    const footerHeaderTemplate = (
        <>
            <Divider/>
            <p>Requerimientos</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Un caracter en minúsculas</li>
                <li>Un caracter en mayúsculas</li>
                <li>Un dígito</li>
                <li>Un mínimo de 8 caracteres</li>
            </ul>
        </>
    );

    const _LoginForm = observer(() => {
        return (
      <div className="flex justify-center items-center h-screen bg-leaf-wall">
       <div className="border w-full max-w-96 border-gray-300 rounded-lg p-8 mx-8 bg-primary">

        <div className="flex justify-center items-center mb-6 gap-1">
          <img className="w-12" src="/1.png" />
          <h1 className="font-montserrat text-4xl text-secondary">BotaniQ</h1>
        </div>

          <div className="flex flex-col gap-2 font-quicksand">

                <div hidden={isConfirmation}>
                    <label htmlFor="email" className="font-sniglet text-secondary block">
                        Correo electrónico
                    </label>
                    <Tooltip target=".email" /> {/* Tooltip appears only on invalid inputs */}
                    <InputText
                        name="email"
                        id="email"
                        type="text"
                        className="w-full email"
                        value={store.login.email}
                        invalid={store.loginValidationResult.email !== ''}
                        onInvalid={onInvalidHandler}
                        onChange={onChangeHandler}
                        data-pr-tooltip={store.loginValidationResult.email} // Attach tooltip
                        data-pr-position="right"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="font-sniglet text-secondary block">
                        Contraseña
                    </label>
                    <Tooltip target=".password">

                    </Tooltip>
                    <Password
                        name="password"
                        id="password"
                        className="w-full p-password"
                        inputClassName="w-full password"
                        feedback={isConfirmation}
                        invalid={store.loginValidationResult.password !== ''}
                        promptLabel="Introduzca su contraseña"
                        weakLabel="Débil"
                        mediumLabel="Media"
                        strongLabel="Fuerte"
                        footer={footerHeaderTemplate}
                        toggleMask
                        value={store.login.password}
                        onInvalid={onInvalidHandler}
                        onChange={onChangeHandler}
                        data-pr-tooltip={store.loginValidationResult.password}
                        data-pr-position="right"
                    />
                </div>

                <div hidden={!isConfirmation}>
                    <label htmlFor="passwordConfirmation" className="font-sniglet text-secondary block">
                        Confirme su contraseña
                    </label>
                    <Tooltip target=".passwordConfirmation" /> {/* Tooltip appears only on invalid inputs */}
                    <Password
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        className="w-full p-password"
                        inputClassName="w-full passwordConfirmation"
                        promptLabel="Introduzca su contraseña"
                        weakLabel="Débil"
                        mediumLabel="Media"
                        strongLabel="Fuerte"
                        invalid={store.loginValidationResult.passwordConfirmation !== ''}
                        footer={footerHeaderTemplate}
                        toggleMask
                        value={store.login.passwordConfirmation}
                        onInvalid={onInvalidHandler}
                        onChange={onChangeHandler}
                        data-pr-tooltip={store.loginValidationResult.passwordConfirmation}
                        data-pr-position="right"
                    />
                </div>

                <Button
                    severity="secondary"
                    className="mt-4"
                    onClick={onSubmitHandler}
                    label={isConfirmation ? "Confirmar contraseña" : "Iniciar sesión"}>
                </Button>
          </div>
      </div>
      </div>)
    });

    return <_LoginForm/>
};
  
export default LoginComponent;
  