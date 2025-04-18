import { Button } from 'primereact/button';
import React from 'react';
import { PiPlantBold } from 'react-icons/pi';
import { useAppPlantPanel } from '../hooks/use-app-plant-panel';

interface AppPlantPanelProps {
    app: AppItem;
}

const AppPlantPanel: React.FC<AppPlantPanelProps> = React.memo(({ app }) => {
    const { loading, plants } = useAppPlantPanel(app);

    return (
        <div className="h-full w-full">
            <div className="flex justify-between px-2 pl-4 py-2 mb-2 items-center bg-gray-200 rounded-l-lg">
                <div className="flex items-center space-x-2">
                    <PiPlantBold fontSize={20} />
                    <p className="text-center font-montserrat font-semibold text-xl">
                        {app.name}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button rounded icon="pi pi-pencil" size="small"></Button>
                    <Button
                        rounded
                        icon="pi pi-trash"
                        severity="danger"
                        size="small"
                    ></Button>
                </div>
            </div>
            <div className="h-[90%] overflow-y-scroll">
                {!loading && (
                    <ul className="flex-grow grid md:grid-cols-2">
                        {plants.map((p, i) => (
                            <li
                                key={i}
                                className="mx-4 rounded-lg my-1 px-4 py-1 bg-gray-100 text-gray-600 font-serif"
                            >
                                <span
                                    className={`w-fit text-xl font-quicksand font-semibold text-primary hover:underline hover:cursor-pointer `}
                                >
                                    {p.name}
                                </span>
                                <span className="text-info font-quicksand text-sm">
                                    <br />
                                    {p.genus} {p.species} {p.authors}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
});

export default AppPlantPanel;
