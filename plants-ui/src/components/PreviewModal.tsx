import { Modal } from "flowbite-react";
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

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  monograph: Monograph | null;
}

function* getVulgarNames(names: VulgarNames) {
  for (const country of Object.keys(names)) {
    console.log(`País: ${country}`);
    for (const name of names[country]) {
      console.log(`· ${name}`);
      yield { country, name };
    }
  }
}

function PreviewModal({ show, setShow, monograph }: Props) {
  return (
    <Modal show={show} onClose={() => setShow(false)} size="5xl">
      <Modal.Header className="shadow-lg shadow-gray-200">
        <div className="flex items-center space-x-2">
            <div><img className="w-8" src="1.png"/></div>
            <p className="text-primary text-4xl">{monograph?.Name}</p>
        </div>
        <p className="text-gray-400 text-md">
          {monograph?.Sc.genus} {monograph?.Sc.species} {monograph?.Sc.authors}{" "}
          {monograph?.Sc.var} {monograph?.Sc.subsp} {monograph?.Sc.f}
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {monograph && monograph?.Sc.family !== "" && (
            <PreviewCategory name="Familia" icon={<TbTournament />}>
              <p>{monograph?.Sc.family}</p>
            </PreviewCategory>
          )}

          {monograph && monograph?.Sy.length > 0 && (
            <PreviewCategory name="Sinónimos" icon={<FaEquals />}>
              {monograph?.Sy.map((syn) => (
                <p>· {syn}</p>
              ))}
            </PreviewCategory>
          )}

          {monograph && monograph?.Vul && (
            <PreviewCategory name="Otros nombre vulgares" icon={<FaList />}>
              {monograph?.Vul &&
                Array.from(getVulgarNames(monograph.Vul)).map(
                  ({ country, name }) => (
                    <p>
                      · {name} ({country})
                    </p>
                  )
                )}
            </PreviewCategory>
          )}

          {monograph && monograph?.Hab !== "" && (
            <PreviewCategory name="Hábitat y Distribución" icon={<MdForest />}>
              <p>{monograph?.Hab}</p>
            </PreviewCategory>
          )}

          {monograph && monograph?.Des !== "" && (
            <PreviewCategory name="Descripción Botánica" icon={<PiTreeFill />}>
              <p>{monograph?.Des}</p>
            </PreviewCategory>
          )}

          {monograph && monograph?.Cmp !== "" && (
            <PreviewCategory name="Composición" icon={<SlChemistry />}>
              <p>{monograph?.Cmp}</p>
            </PreviewCategory>
          )}

          {monograph && monograph?.Use !== "" && (
            <PreviewCategory name="Partes empleadas" icon={<ImLeaf />}>
              <p>{monograph?.Use}</p>
            </PreviewCategory>
          )}

          {monograph && monograph?.Pro !== "" && (
            <PreviewCategory name="Propiedades" icon={<FaBriefcaseMedical />}>
              <p>{monograph?.Pro}</p>
            </PreviewCategory>
          )}

          {monograph && monograph?.App !== "" && (
            <PreviewCategory name="Aplicaciones" icon={<FaHandHoldingMedical />}>
              <p>{monograph?.App}</p>
            </PreviewCategory>
          )}

          {monograph && monograph?.Bib.length > 0 && (
            <PreviewCategory name="Bibliografía" icon={<ImBooks />}>
              {monograph?.Bib.map((bib) => (
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
