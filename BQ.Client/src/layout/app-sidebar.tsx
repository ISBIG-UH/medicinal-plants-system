import { PanelMenu } from 'primereact/panelmenu';
import Divider from '../components/divider';

function AppSideBar() {
    const items = [
        {
            label: 'Administración',
            icon: 'pi pi-sliders-h',
            items: [
                {
                    label: 'Usuarios',
                },
                {
                    label: 'Organizaciones',
                },
            ],
        },
        {
            label: 'Búsqueda',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Búsqueda de texto',
                },
                {
                    label: 'Búsqueda por índice',
                },
                {
                    label: 'Búsqueda de aplicación',
                },
            ],
        },
        {
            label: 'Edición',
            icon: 'pi pi-pencil',
            items: [
                {
                    label: 'Añadir monografía',
                },
            ],
        },
        {
            label: 'Acerca',
            icon: 'pi pi-info-circle',
            items: [
                {
                    label: 'Manual de usuario',
                },
                {
                    label: 'Manual de desarrollador',
                },
                {
                    label: 'Términos y condiciones',
                },
            ],
        },
    ];

    return (
        <div className="bg-gray-200 overflow-hidden transition-max-width duration-500 ease-in-out w-full h-full flex flex-col">
            <div className="px-3 flex flex-col h-full">
                <p className="mt-2 text-center text-xl font-semibold font-montserrat py-2">
                    Menú
                </p>

                <Divider className="px-10 mb-2">
                    <i className="pi pi-search"></i>
                </Divider>

                <div className="h-full">
                    <PanelMenu model={items} className="md:w-full" />
                </div>

                <div className="text-center text-sm p-1">
                    <label className="font-montserrat">BotaniQ</label>
                    <br />
                    Todos los derechos reservados
                </div>
            </div>
        </div>
    );
}

export default AppSideBar;
