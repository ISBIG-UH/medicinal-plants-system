import { Button, Label, TextInput } from "flowbite-react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import useLogin from "../hooks/useLogin";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";

function LogIn() {
  const { showPassword, setShowPassword, handleLogIn, loading } = useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const response = await handleLogIn(e);

    if (response.type == "error") {
      toast.error(response.msg);
    } else if (response.type == "success") {
      toast.success(response.msg);
    } else if (response.type == "null") {
      return;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-leaf-wall">
      <div className="border w-full max-w-96 border-gray-300 rounded-lg p-8 mx-8 bg-primary">
        <div className="flex justify-center items-center mb-6 gap-1">
          <img className="w-12" src="1.png" />
          <h1 className="font-montserrat text-4xl text-secondary">BotaniQ</h1>
        </div>
        <div className="">
          <form className="flex flex-col gap-4 font-quicksand" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="username"
                  className="font-sniglet text-secondary"
                  value="Nombre de usuario"
                />
              </div>
              <TextInput
                id="username"
                type="text"
                name="username"
                autoComplete="username"
                placeholder="fulanito01"
                required
                onInvalid={(e) => {
                  (e.target as HTMLInputElement).setCustomValidity(
                    "Por favor, ingresa tu nombre de usuario."
                  );
                }}
                onInput={(e) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  className="font-sniglet text-secondary"
                  value="Contraseña"
                />
              </div>
              <div className="relative">
                <TextInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  onInvalid={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity(
                      "Por favor, ingresa tu contraseña."
                    );
                  }}
                  onInput={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity("")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 p-1 text-gray-400 hover:text-primary"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              color="yellow"
              className="bg-secondary hover:bg-yellow-100 text-primary font-semibold"
              isProcessing={loading}
              processingSpinner={
                <AiOutlineLoading className="h-4 w-4 animate-spin" />
              }
            >
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
