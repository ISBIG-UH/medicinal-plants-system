import { TbCircleLetterN } from "react-icons/tb";
import { FaEquals } from "react-icons/fa";
import { PiPlantBold } from "react-icons/pi";

export const appTextFields = [
  {
    label: "Nombre de Propiedad",
    inputs: [
      { id: "name", placeholder: "Nombre", required: true, useArea: false },
    ],
    useFlex: true,
    icon: TbCircleLetterN,
  },
];

export const appListFields = [
  {
    label: "Sinónimos",
    id: "sys",
    placeholder: "Sinónimo*",
    required: true,
    icon: FaEquals,
  },
  {
    label: "Plantas",
    id: "plants",
    placeholder: "Planta*",
    required: true,
    icon: PiPlantBold,
  },
];
