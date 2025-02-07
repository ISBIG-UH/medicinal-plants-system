import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen space-y-4 text-center">
      <img src='/1.png' className='h-32' alt='botaniq' />
      <h1 className="text-4xl font-montserrat font-bold text-gray-800">404 - Página no encontrada</h1>
      <p className="font-quicksand text-gray-600">Lo sentimos, la página que buscas no existe.</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 font-quicksand bg-primary text-secondary rounded-md hover:bg-green-800 transition"
      >
        Ir a Inicio
      </Link>
    </div>
  );
}

export default NotFound;