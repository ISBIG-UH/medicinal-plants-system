import { Button, Modal } from "flowbite-react";
import EditTextCategory from "./EditTextCategory";
import { TbTournament } from "react-icons/tb";
import { FaBriefcaseMedical, FaEquals, FaHandHoldingMedical, FaList } from "react-icons/fa";
import { MdForest } from "react-icons/md";
import { PiTreeFill } from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";
import { PiPlantBold } from "react-icons/pi";
import { ImBooks, ImLeaf } from "react-icons/im";
import EditListCategory from "./EditListCategory";
import { useEditMonograph } from "../hooks/useEditMonograph";
import DangerConfirmationModal from "./DangerConfirmationModal";
import { useDeleteMonograph } from "../hooks/useDeleteMonograh";

interface Props {
  monograph: Monograph;
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
}


function EditPlantModal({ openModal, setOpenModal, monograph }: Props) {
  
  const { name, setName, family, setFamily, hab, setHab, des, setDes, cmp, setCmp, use, setUse, pro, setPro, cul, setCul, app, setApp, sy, setSy, vul, setVul, bib, setBib, handleSave } = useEditMonograph(monograph, setOpenModal);
  const { handleConfirmation, handleDelete, confirmationOpen, setConfirmationOpen } = useDeleteMonograph(monograph, setOpenModal);

  return (
    <div>
      <Modal show={openModal} size='5xl' onClose={() => setOpenModal(false)}>
      <Modal.Header className="shadow-lg shadow-gray-200">
        <EditTextCategory value={name} setter={setName} name="Nombre" text={monograph.Name} icon={<></>} className="text-primary text-4xl" required simple/>
        <p className="text-gray-400 text-md">{`${monograph.genus} ${monograph.species} ${monograph.authors} ${monograph.var} ${monograph.subsp} ${monograph.f}`}</p>
      </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <EditTextCategory value={family} setter={setFamily} name="Familia" text={monograph.family} icon={<TbTournament />}/>

            <EditListCategory value={sy} setter={setSy} list={monograph.Sy} name="Sinónimos" icon={<FaEquals />}/>
           
            <EditListCategory value={vul} setter={setVul} list={monograph.Vul} name="Otros nombres vulgares" icon={<FaList />}/>

            <EditTextCategory value={hab} setter={setHab} name="Hábitat y Distribución" text={monograph.Hab} icon={<MdForest />}/>

            <EditTextCategory value={des} setter={setDes} name="Descripción Botánica" text={monograph.Des} icon={<PiTreeFill />}/>

            <EditTextCategory value={cmp} setter={setCmp} name="Composición" text={monograph.Cmp} icon={<SlChemistry />}/>

            <EditTextCategory value={use} setter={setUse} name="Partes empleadas" text={monograph.Use} icon={<ImLeaf />}/>

            <EditTextCategory value={pro} setter={setPro} name="Propiedades" text={monograph.Pro} icon={<FaBriefcaseMedical />}/>

            <EditTextCategory value={cul} setter={setCul} name="Cultivo" text={monograph.Cul} icon={<PiPlantBold />}/>

            <EditTextCategory value={app} setter={setApp} name="Aplicaciones" text={monograph.App} icon={<FaHandHoldingMedical />}/>

            <EditListCategory value={bib} setter={setBib} list={monograph.Bib} name="Bibliografía" icon={<ImBooks />}/>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-between">
          <Button color="failure" onClick={handleConfirmation}>Eliminar</Button>
          <div className="flex space-x-2">
            <Button color="success" onClick={handleSave}>Guardar</Button>
            {/* <Button color="success" onClick={handleSaveClose}>Guardar y Cerrar</Button> */}
            <Button color="gray" onClick={() => setOpenModal(false)}>Cerrar</Button>
          </div>
        </Modal.Footer>
      </Modal>

      <DangerConfirmationModal openModal={confirmationOpen} setOpenModal={setConfirmationOpen} operationFunction={handleDelete} msg="¿Seguro que desea eliminar esta monografía?" />

    </div>
  );
}

export default EditPlantModal;