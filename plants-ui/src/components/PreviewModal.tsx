import { Alert, Modal } from "flowbite-react";
import PreviewCategory from "./PreviewCategory";
import { TbTournament } from "react-icons/tb";
import { FaEquals } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { PiTreeFill } from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";
import { MdForest } from "react-icons/md";
import { ImLeaf } from "react-icons/im";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { HiInformationCircle } from "react-icons/hi";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  monograph: Monograph;
}


function PreviewModal({ show, setShow, monograph }: Props) {
  return (
    <Modal show={show} onClose={() => setShow(false)} size="5xl">
      <Modal.Header className="shadow-lg shadow-gray-200">
        <div className="flex items-center mb-2 space-x-2">
            <div><img className="w-8" src="1.png"/></div>
            <p className="text-primary font-montserrat font-bold text-2xl lg:text-4xl">{monograph.name}</p>
        </div>
        <p className="text-gray-400 font-quicksand text-base lg:text-md">
          {monograph.genus} {monograph.species} {monograph.authors}{" "}
          {monograph.var} {monograph.subsp} {monograph.f}
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6 whitespace-pre-line">
          {monograph.name[monograph.name.length - 1] === "*" && <Alert color="info" icon={HiInformationCircle}>
            <span className="font-medium">Nota del autor:</span> Las plantas cuyos nombres terminan con (*) constituyen especies exóticas introducidas en el país.
          </Alert>}

          {monograph.family !== "" && (
            <PreviewCategory name="Familia" icon={<TbTournament />}>
              <p>{monograph.family}</p>
            </PreviewCategory>
          )}

          {monograph.sy.length > 0 && (
            <PreviewCategory key={monograph.id} name="Sinónimos" icon={<FaEquals />}>
              {monograph.sy.map((syn) => (
                <p>· {syn}</p>
              ))}
            </PreviewCategory>
          )}

          {monograph.vul.length > 0 && (
            <PreviewCategory name="Otros nombre vulgares" icon={<FaList />}>
              {monograph.vul.map((vul) => (
                <p>
                · {vul}
                </p>
              ))}
            </PreviewCategory>
          )}

          {monograph.hab !== "" && (
            <PreviewCategory name="Hábitat y Distribución" icon={<MdForest />}>
              <p>{monograph.hab}</p>
            </PreviewCategory>
          )}

          {monograph.des !== "" && (
            <PreviewCategory name="Descripción Botánica" icon={<PiTreeFill />}>
              <p>{monograph.des}</p>
            </PreviewCategory>
          )}

          {monograph.cmp !== "" && (
            <PreviewCategory name="Composición" icon={<SlChemistry />}>
              <p>{monograph.cmp}</p>
            </PreviewCategory>
          )}

          {monograph.use !== "" && (
            <PreviewCategory name="Partes empleadas" icon={<ImLeaf />}>
              <p>{monograph.use}</p>
            </PreviewCategory>
          )}

          {monograph.pro !== "" && (
            <PreviewCategory name="Propiedades" icon={<FaBriefcaseMedical />}>
              <p>{monograph.pro}</p>
            </PreviewCategory>
          )}

          {monograph.app !== "" && (
            <PreviewCategory name="Aplicaciones" icon={<FaHandHoldingMedical />}>
              <p>{monograph.app}</p>
            </PreviewCategory>
          )}

          {monograph.bib.length > 0 && (
            <PreviewCategory name="Bibliografía" icon={<ImBooks />}>
              {monograph.bib.map((bib) => (
                <p>· {bib}</p>
              ))}
            </PreviewCategory>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        
        <div className="flex w-full justify-end">
            <button className="bg-primary hover:bg-green-800 px-4 py-2 rounded-lg text-white font-semibold transition-all ease-in-out duration-300" onClick={() => setShow(false)}>
                Cerrar
            </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default PreviewModal;
