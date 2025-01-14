import { Alert, Button, Drawer, Spinner } from "flowbite-react"
import { IoClose } from "react-icons/io5";
import { CiCircleAlert } from "react-icons/ci";
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { useAppPage } from "../hooks/useAppPage";


function AppPage(){
    const { isOpen, setIsOpen, apps, selectedApp, loading, loadingApp, handleSelect } = useAppPage()
    
    return (
        <div className="h-full pb-14 lg:pb-0">

            {/* Section for small screen only  */}
            {!loading && <div className="flex flex-col lg:hidden">
                <div className="flex p-2 px-6 items-center justify-center">
                    <Button className="w-full bg-primary text-secondary" color="success" disabled={loadingApp} onClick={() => setIsOpen(true)}>
                        <div className="flex items-center justify-between space-x-1">
                            <MdChangeCircle size={20} />
                            <div className="font-quicksand">
                                <p>{selectedApp?.name}</p>
                                {selectedApp && selectedApp.sys.length > 0 && <p className="text-xs font-light">({selectedApp?.sys})</p>}
                            </div>
                        </div>
                    </Button>
                </div>
                <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="flex justify-between px-2 pl-4 py-2 mb-2 items-center bg-primary text-secondary rounded-lg">
                        <div className="flex items-center space-x-2">
                            <FaHandHoldingMedical/>
                            <p className="text-center font-montserrat font-semibold text-xl">Aplicaciones</p>
                        </div>
                        <button className="hover:bg-green-800" onClick={() => setIsOpen(false)}><IoClose size={30}/></button>
                    </div>
                    <div className="overflow-y-scroll">
                        {apps?.map((app) => (
                            <button key={app.id} className={`py-2 px-4 ${app.id === selectedApp?.id ? "bg-secondary" : "bg-gray-100"} w-full text-left font-quicksand font-extrabold rounded-r-xl border-b-2 hover:cursor-pointer`} onClick={() => {handleSelect(app.id);setIsOpen(false);}}>
                                {app.name}
                            </button>
                        ))}
                    </div>
                </Drawer>
            </div>}
            
            {!loading && <div className="flex flex-row h-full w-full">

                {/* Section for large screen only */}
                <div className="hidden lg:flex lg:flex-col h-full min-w-56">
                    <div className="flex items-center p-2 px-4 space-x-2 border-r bg-primary text-secondary rounded-b-md">
                        <FaHandHoldingMedical/>
                        <p className="font-semibold font-montserrat text-lg">Aplicaciones</p>
                    </div>
                    <div className="space-y-2 p-2 overflow-y-auto">
                        {apps.map(app => (
                            <div key={app.id} className={`px-2 py-1 ${app.id === selectedApp?.id ? "text-black font-quicksand font-extrabold" : "text-gray-500"}  hover:text-black hover:cursor-pointer`} onClick={() => handleSelect(app.id)}>
                                {app.name}
                            </div>
                        ))}
                    </div>
                </div>

                {!loadingApp && <div className="w-full overflow-y-auto">
                    <div className="hidden lg:flex items-center space-x-2 font-quicksand font-semibold text-xl bg-primary text-secondary rounded-md m-1 px-4 py-2">
                        <p className="">{selectedApp?.name}</p>
                        {selectedApp && selectedApp.sys.length > 0 && <p className="text-sm font-light">({selectedApp?.sys})</p>}
                    </div>

                    <ul className="flex-grow grid md:grid-cols-2 xl:grid-cols-3">
                        {selectedApp?.plants.map((plant, i) => (
                            <li key={i} className="mx-4 rounded-lg my-1 px-4 py-1 bg-gray-100 text-gray-600 font-quicksand font-bold">
                                <p className="text-lg">{plant}</p>
                            </li>
                        ))}
                    </ul>

                    <Alert className="m-4" color="info">
                        <div className="flex font-quicksand items-center">
                            <span className="mr-2">
                                <CiCircleAlert size={20}/>
                            </span>
                            Solo se muestra la planta si su propiedad es bien notoria y reconocida
                        </div>
                    </Alert>
                </div>}

                {loadingApp && <div className="flex w-full h-full items-center justify-center">
                    <Spinner color="success" className="h-16 w-16" />
                </div>}

            </div>}

            {loading && <div className="flex h-full items-center justify-center">
                <Spinner color="success" className="h-16 w-16" />
            </div>}
        </div>
    )
}

export default AppPage