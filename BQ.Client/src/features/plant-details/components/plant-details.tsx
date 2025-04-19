import { Dialog } from 'primereact/dialog';
import { TbTournament } from 'react-icons/tb';
import { FaEquals } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';
import { PiTreeFill } from 'react-icons/pi';
import { SlChemistry } from 'react-icons/sl';
import { MdForest } from 'react-icons/md';
import { ImLeaf } from 'react-icons/im';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';
import React from 'react';
import DetailsSection from '../../../components/details-section';
import { Message } from 'primereact/message';

interface PlantDetailsProps {
    visible: boolean;
    onHide: () => void;
    monograph: Monograph;
}

const PlantDetails: React.FC<PlantDetailsProps> = ({
    visible,
    onHide,
    monograph,
}) => {
    const headerElement = (
        <div className="">
            <div className="flex items-center mb-2 space-x-2">
                <div>
                    <img className="w-8" src="/1.png" />
                </div>
                <p className="text-primary font-montserrat font-bold text-2xl lg:text-4xl">
                    {monograph.name}
                </p>
            </div>
            <p className="text-info font-quicksand text-base lg:text-md">
                {monograph.genus} {monograph.species} {monograph.authors}{' '}
                {monograph.var} {monograph.subsp} {monograph.f}
            </p>
        </div>
    );

    const footerElement = (
        <div className="">
            <div className="flex items-center mb-2 space-x-2"></div>
        </div>
    );

    return (
        <Dialog
            visible={visible}
            style={{ width: '50vw' }}
            contentStyle={{ height: '65vh' }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            onHide={onHide}
            resizable={false}
            header={headerElement}
            footer={footerElement}
        >
            {monograph.name[monograph.name.length - 1] === '*' && (
                <Message
                    className="mb-5"
                    severity="info"
                    text="Nota del autor: Las plantas cuyos nombres terminan con (*) constituyen especies exóticas introducidas en el país."
                />
            )}

            <div className="space-y-6 whitespace-pre-line">
                {monograph.family !== '' && (
                    <DetailsSection name="Familia" icon={<TbTournament />}>
                        <p>{monograph.family}</p>
                    </DetailsSection>
                )}

                {monograph.sy != null && monograph.sy.length > 0 && (
                    <DetailsSection
                        key={monograph.id}
                        name="Sinónimos"
                        icon={<FaEquals />}
                    >
                        {monograph.sy.map((syn) => (
                            <p>&#9679; {syn}</p>
                        ))}
                    </DetailsSection>
                )}

                {monograph.vul != null && monograph.vul.length > 0 && (
                    <DetailsSection
                        name="Otros nombre vulgares"
                        icon={<FaList />}
                    >
                        {monograph.vul.map((vul) => (
                            <p>&#9679; {vul}</p>
                        ))}
                    </DetailsSection>
                )}

                {monograph.hab !== '' && (
                    <DetailsSection
                        name="Hábitat y Distribución"
                        icon={<MdForest />}
                    >
                        <p>{monograph.hab}</p>
                    </DetailsSection>
                )}

                {monograph.des !== '' && (
                    <DetailsSection
                        name="Descripción Botánica"
                        icon={<PiTreeFill />}
                    >
                        <p>{monograph.des}</p>
                    </DetailsSection>
                )}

                {monograph.cmp !== '' && (
                    <DetailsSection name="Composición" icon={<SlChemistry />}>
                        <p>{monograph.cmp}</p>
                    </DetailsSection>
                )}

                {monograph.use !== '' && (
                    <DetailsSection name="Partes empleadas" icon={<ImLeaf />}>
                        <p>{monograph.use}</p>
                    </DetailsSection>
                )}

                {monograph.pro !== '' && (
                    <DetailsSection
                        name="Propiedades"
                        icon={<FaBriefcaseMedical />}
                    >
                        <p>{monograph.pro}</p>
                    </DetailsSection>
                )}

                {monograph.app !== '' && (
                    <DetailsSection
                        name="Aplicaciones"
                        icon={<FaHandHoldingMedical />}
                    >
                        <p>{monograph.app}</p>
                    </DetailsSection>
                )}

                {monograph.bib != null && monograph.bib.length > 0 && (
                    <DetailsSection name="Bibliografía" icon={<ImBooks />}>
                        {monograph.bib.map((bib) => (
                            <p>&#9679; {bib}</p>
                        ))}
                    </DetailsSection>
                )}
            </div>
        </Dialog>
    );
};

export default PlantDetails;
