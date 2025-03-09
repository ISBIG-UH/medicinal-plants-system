import Divider from "../components/Divider";
import { PanelMenu } from 'primereact/panelmenu';



function AppSideBar() {;
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
          }
        ]
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
            }
        ]
    },
    {
        label: 'Edición',
        icon: 'pi pi-pencil',
        items: [
            {
                label: 'Añadir monografía',
            },
        ]
    },
    {
      label: 'Acerca De',
      icon: 'pi pi-question',
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
      ]
  }
];


  return (
    <>
      <div className="flex flex-row overflow-y-auto h-full">
        <div
          className={`bg-gray-200 overflow-hidden transition-max-width duration-500 ease-in-out md:w-64 w-full flex flex-col px-2`}
        >
          <p className="mt-2 text-center text-xl font-semibold font-montserrat py-2">
            Menú
          </p>


          <Divider className="px-10 mb-2" >
            <i className="pi pi-search"></i>
          </Divider>

          <div className="h-full">

          <PanelMenu model={items} className="md:w-full" />
          </div>
     
          <div className="text-center text-sm p-1">
            <label className="font-montserrat">BotaniQ</label><br/>
            Todos los derechos reservados
          </div>
        </div>

      </div>
    </>
  );
}

export default AppSideBar;
