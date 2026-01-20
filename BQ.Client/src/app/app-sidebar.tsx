import { PanelMenu } from 'primereact/panelmenu';
import { GiMedicines } from 'react-icons/gi';
import { PiPlantBold } from 'react-icons/pi';
import { useNavigate } from 'react-router';
import useAppStore from '../hooks/use-app-store';
import { useMediaQuery } from '@react-hook/media-query';
import { Divider } from '../components';

function AppSideBar() {
    const navigate = useNavigate();
    const { toggleSidebar } = useAppStore();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const items = [
        // {
        //     label: 'Administración',
        //     icon: 'pi pi-sliders-h',
        //     items: [
        //         {
        //             label: 'Usuarios',
        //             icon: 'pi pi-user',
        //             command: () => {
        //                 navigate('/users');
        //                 if (isMobile) toggleSidebar();
        //             },
        //         },
        //         // {
        //         //     label: 'Organizaciones',
        //         // },
        //     ],
        // },
        {
            label: 'Búsqueda',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Búsqueda de texto',
                    icon: 'pi pi-language',
                    command: () => {
                        navigate('/search/text');
                        if (isMobile) toggleSidebar();
                    },
                },
                {
                    label: 'Búsqueda por índice',
                    icon: 'pi pi-sort-alpha-down',
                    command: () => {
                        navigate('/search/index');
                        if (isMobile) toggleSidebar();
                    },
                },
                {
                    label: 'Búsqueda de aplicación',
                    icon: (
                        <GiMedicines
                            style={{ marginRight: '0.2em', fontSize: 20 }}
                        />
                    ),
                    command: () => {
                        navigate('/search/app');
                        if (isMobile) toggleSidebar();
                    },
                },
            ],
        },
        // {
        //     label: 'Edición',
        //     icon: 'pi pi-pencil',
        //     items: [
        //         {
        //             label: 'Añadir monografía',
        //             icon: 'pi pi-plus',
        //             command: () => {
        //                 navigate('/plant/create');
        //                 if (isMobile) toggleSidebar();
        //             },
        //         },
        //     ],
        // },
        {
            label: 'Acerca',
            icon: 'pi pi-info-circle',
            command: () => {
                navigate('/about');
                if (isMobile) toggleSidebar();
            },
        },
    ];

    return (
        <div className="overflow-hidden transition-max-width duration-500 ease-in-out w-full h-full flex flex-col">
            <div className="px-3 flex flex-col h-full">
                <p className="mt-2 text-center text-xl font-semibold font-montserrat py-2">
                    Menú
                </p>

                <Divider className="px-10 mb-2">
                    <PiPlantBold fontSize={20} />
                </Divider>

                <div className="h-full">
                    <PanelMenu multiple model={items} className="md:w-full" />
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
