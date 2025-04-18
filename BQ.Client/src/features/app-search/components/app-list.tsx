import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { useAppList } from '../hooks/use-app-list';
import React from 'react';

interface AppListProps {
    onAppSelect: (app: AppItem) => void;
}

const AppList: React.FC<AppListProps> = React.memo(({ onAppSelect }) => {
    const { loading, apps, selectedApp, handleSearch, handleAppSelected } =
        useAppList(onAppSelect);

    return (
        <div className="h-full w-full pr-1">
            <div className="h-24">
                <div className="flex justify-between px-2 pl-4 py-2 mb-2 items-center bg-gray-200 rounded-r-lg">
                    <div className="flex items-center space-x-2">
                        <FaHandHoldingMedical />
                        <p className="text-center font-montserrat font-semibold text-xl">
                            Aplicaciones
                        </p>
                    </div>
                    <Button rounded icon="pi pi-plus" size="small"></Button>
                    {/* <button className="hover:bg-green-800" onClick={() => setIsOpen(false)}><IoClose size={30}/></button> */}
                </div>

                <div className="px-2">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            className="w-full"
                            size="small"
                            placeholder="Search"
                        />
                    </IconField>
                </div>
            </div>

            <div className="h-[88%] p-2 overflow-y-auto">
                <div>
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            className={`px-2 py-1 font-quicksand ${app.id === selectedApp?.id ? 'text-black font-bold' : 'text-gray-500'}  hover:text-black hover:cursor-pointer`}
                            onClick={() => handleAppSelected(app)}
                        >
                            {app.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default AppList;
