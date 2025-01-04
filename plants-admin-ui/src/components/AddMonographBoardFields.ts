import { TbTournament, TbCircleLetterN } from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { FaBriefcaseMedical, FaEquals, FaHandHoldingMedical, FaList } from "react-icons/fa";
import { MdForest } from "react-icons/md";
import { PiTreeFill } from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";
import { PiPlantBold } from "react-icons/pi";
import { ImBooks, ImLeaf } from "react-icons/im";

export const groupsTextFields = [
  {
    label: "Nombre de la planta",
    inputs: [
      { id: "name", placeholder: "Nombre", required: true, useArea: false },
    ],
    useFlex: true,
    icon: TbCircleLetterN,
  },
  {
    label: "Nombre científico",
    inputs: [
      { id: "genus", placeholder: "género", required: true, useArea: false },
      { id: "species", placeholder: "especie", required: true, useArea: false },
      {
        id: "authors",
        placeholder: "autoridad",
        required: false,
        useArea: false,
      },
      {
        id: "subsp",
        placeholder: "subespecie",
        required: false,
        useArea: false,
      },
      { id: "var", placeholder: "variedad", required: false, useArea: false },
      { id: "f", placeholder: "forma", required: false, useArea: false },
    ],
    useFlex: false,
    icon: HiMiniBeaker,
  },
  {
    label: "Familia y Subfamilia",
    inputs: [
      { id: "family", placeholder: "Familia", required: false, useArea: false },
      {
        id: "subfamily",
        placeholder: "Subfamilia",
        required: false,
        useArea: false,
      },
    ],
    useFlex: false,
    icon: TbTournament,
  },
  {
    label: "Hábitat y Distribución",
    inputs: [
      {
        id: "Hab",
        placeholder: "Planta que se encuentra en...",
        required: false,
        useArea: true,
      },
    ],
    useFlex: true,
    icon: MdForest,
  },
  {
    label: "Descripción Botánica",
    inputs: [
      {
        id: "Des",
        placeholder: "Planta que tiene las hojas...",
        required: false,
        useArea: true,
      },
    ],
    useFlex: true,
    icon: PiTreeFill,
  },
  {
    label: "Composición",
    inputs: [
      { id: "Cmp", placeholder: "Contiene...", required: false, useArea: true },
    ],
    useFlex: true,
    icon: SlChemistry,
  },
  {
    label: "Partes Empleadas",
    inputs: [
      {
        id: "Use",
        placeholder: "Las hojas...",
        required: false,
        useArea: true,
      },
    ],
    useFlex: true,
    icon: ImLeaf,
  },
  {
    label: "Propiedades",
    inputs: [
      {
        id: "Pro",
        placeholder: "Esta planta es...",
        required: false,
        useArea: true,
      },
    ],
    useFlex: true,
    icon: FaBriefcaseMedical,
  },
  {
    label: "Aplicaciones",
    inputs: [
      {
        id: "App",
        placeholder: "Es utilizada...",
        required: false,
        useArea: true,
      },
    ],
    useFlex: true,
    icon: FaHandHoldingMedical,
  },
  {
    label: "Cultivo",
    inputs: [
      {
        id: "Cul",
        placeholder: "Crece mejor...",
        required: false,
        useArea: true,
      },
    ],
    useFlex: true,
    icon: PiPlantBold,
  },
];

export const listFields = [
  {
    label: "Sinónimos",
    id: "Sy",
    placeholder: "Sinónimo*",
    required: true,
    icon: FaEquals,
  },
  {
    label: "Otros nombres vulgares",
    id: "Vul",
    placeholder: "Nombre vulgar*",
    required: true,
    icon: FaList,
  },
  {
    label: "Bibliografía",
    id: "Bib",
    placeholder: "Referencia*",
    required: true,
    icon: ImBooks,
  },
];
