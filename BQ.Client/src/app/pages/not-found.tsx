import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 h-screen space-y-4 text-center">
            <img src="/1.png" className="h-32" alt="botaniq" />
            <h1 className="text-4xl font-montserrat font-bold text-gray-800">
                404 - Página no encontrada
            </h1>
            <p className="font-quicksand text-gray-600">
                Lo sentimos, la página que buscas no existe.
            </p>

            <Button onClick={() => navigate('/')} label="Ir a Inicio" />
        </div>
    );
};

export default NotFound;
