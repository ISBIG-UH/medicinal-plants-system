import { Button, Drawer, Spinner } from "flowbite-react"
import { IoClose } from "react-icons/io5";
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useAppBoard } from "../hooks/useAppBoard";
import { MdEdit } from "react-icons/md";
import DangerConfirmationModal from "./DangerConfirmationModal";
import { useState } from "react";
import EditAppModal from "./EditAppModal";
import AddAppModal from "./AddAppModal";
import { apiDeleteApp } from "../services/apiServices";
import { toast } from "react-toastify";

function AppsBoard(){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isOpen, setIsOpen, apps, selectedApp, loading, loadingApp, handleSelect, reload, reloadApp, allPlants } = useAppBoard();
    
    const [dangerOpen, setDangerOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [processingDelete, setProcessingDelete] = useState(false);
    
    async function handleDelete(id: number){
        setProcessingDelete(true);
        const response = await apiDeleteApp({id: id});
        setProcessingDelete(false);
        setDangerOpen(false);
        reload();
        
        if (response.toastResponse.type === "success") {
        toast.success(response.toastResponse.msg);
        } else if (response.toastResponse.type === "error") {
        toast.error(response.toastResponse.msg);
        }
    }

    return (
        <div className="h-full lg:pb-0">

            {/* Small Menu  */}
            {!loading && <div className="flex flex-col lg:hidden">
                <div className="p-2 px-6 space-y-2">
                    <Button className="w-full bg-primary text-secondary" color="success" disabled={loadingApp} onClick={() => setAddOpen(true)}>
                        <div className="flex items-center justify-between space-x-1">
                            <IoAddCircle size={20} />
                            <p className="font-quicksand">Nueva Aplicación</p>
                        </div>
                    </Button>

                    <div className="flex items-center justify-center space-x-1">
                        <Button className="w-full bg-gray-300 text-black" color="gray" disabled={loadingApp} onClick={() => setIsOpen(true)}>
                            <div className="flex items-center justify-between space-x-1">
                                <MdChangeCircle size={20} />
                                <div>
                                    <p className="font-quicksand">{selectedApp?.name}</p>
                                    {selectedApp && selectedApp.sys.length > 0 && <p className="text-xs font-light">({selectedApp?.sys.join(', ')})</p>}
                                </div>
                            </div>
                        </Button>
                        <button className="bg-gray-600 rounded-full p-2">
                            <MdEdit size={25} className="text-white hover:cursor-pointer hover:text-red-80" onClick={() => setEditOpen(true)}/>
                        </button>
                        <button className="bg-red-600 rounded-full p-2">
                            <MdDelete size={25} className=" text-white hover:cursor-pointer hover:text-red-800" onClick={() => setDangerOpen(true)}/>
                        </button>
                    </div>
                </div>
                <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="flex justify-between px-2 pl-4 py-2 mb-2 items-center bg-gray-300 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <FaHandHoldingMedical/>
                            <p className="text-center font-montserrat font-semibold text-xl">Aplicaciones</p>
                        </div>
                        <button className="hover:bg-green-800" onClick={() => setIsOpen(false)}><IoClose size={30}/></button>
                    </div>
                    <div className="overflow-y-scroll">
                        {apps?.map((app) => (
                            <button key={app.id} className={`py-2 px-4 font-quicksand ${app.id === selectedApp?.id ? "bg-secondary" : "bg-gray-100"} w-full text-left rounded-r-xl border-b-2 hover:cursor-pointer`} onClick={() => {handleSelect(app.id);setIsOpen(false);}}>
                                {app.name}
                            </button>
                        ))}
                    </div>
                </Drawer>
            </div>}
            
            {!loading && <div className="flex flex-row h-full w-full">

                {/* Large Menu */}
                <div className="hidden lg:flex lg:flex-col h-full min-w-56 max-w-72">
                    <div className="p-2">
                        <Button color="success"size="sm" className="bg-primary w-full text-secondary" onClick={() => setAddOpen(true)}>
                            <div className="flex items-center">
                                <IoAddCircle className="mr-1" size={20}/>
                                Nueva Aplicación
                            </div>
                        </Button>
                    </div>
                    <div className="flex items-center p-2 space-x-2 border-r bg-gray-200 rounded-r-md">
                        <FaHandHoldingMedical/>
                        <p className="font-montserrat font-semibold text-lg">Aplicaciones</p>
                    </div>
                    <div className="space-y-2 p-2 overflow-y-auto">
                        {apps.map(app => (
                            <div key={app.id} className={`px-2 py-1 font-quicksand ${app.id === selectedApp?.id ? "text-black font-bold" : "text-gray-500"}  hover:text-black hover:cursor-pointer`} onClick={() => handleSelect(app.id)}>
                                {app.name}
                            </div>
                        ))}
                    </div>
                </div>

                {!loadingApp && <div className="w-full py-4 flex-grow overflow-y-auto">
                    {/* App header */}
                    <div className="hidden lg:flex justify-between items-center space-x-2 font-semibold text-xl bg-gray-200 m-2 rounded-md px-4 py-2">
                        <div className="flex items-center space-x-1">
                            <p className="font-quicksand">{selectedApp?.name}</p>
                            {selectedApp && selectedApp.sys.length > 0 && <p className="text-sm font-light">({selectedApp?.sys.join(', ')})</p>}
                        </div>
                        <div className="flex space-x-2 font-quicksand">
                            <Button color="gray" size="sm" onClick={() => setEditOpen(true)}><FaRegEdit size={20}/>Editar</Button>
                            <Button color="failure" size="sm" onClick={() => setDangerOpen(true)}><MdDelete size={20}/>Borrar</Button>
                        </div>
                    </div>
                    
                    {/* Plants List */}
                    <ul className="flex-grow grid md:grid-cols-2 xl:grid-cols-3">
                        {selectedApp?.plants.map((plant, i) => (
                            <li key={i} className="mx-4 rounded-lg my-1 px-4 py-1 bg-gray-100 text-gray-600 font-serif">
                                <p className="text-lg font-quicksand font-bold">{plant}</p>
                            </li>
                        ))}
                    </ul>

                </div>}

                {loadingApp && <div className="flex w-full h-full items-center justify-center">
                    <Spinner color="success" className="h-16 w-16" />
                </div>}

            </div>}

            {loading && <div className="flex h-full items-center justify-center">
                <Spinner color="success" className="h-16 w-16" />
            </div>}
            
            {selectedApp && <DangerConfirmationModal openModal={dangerOpen} setOpenModal={setDangerOpen} operationFunction={() => handleDelete(selectedApp?.id)} msg={`¿Seguro que desea eliminar la aplicación: ${selectedApp.name}?`} processing={processingDelete} />}
            
            {selectedApp && <AddAppModal openModal={addOpen} setOpenModal={setAddOpen} reloadFunction={reload} plants={allPlants} />}
            
            {selectedApp && <EditAppModal key={selectedApp.id} openModal={editOpen} setOpenModal={setEditOpen} app={selectedApp} plants={allPlants} reloadFunction={reloadApp} />}
        </div>
    );
}

export default AppsBoard;