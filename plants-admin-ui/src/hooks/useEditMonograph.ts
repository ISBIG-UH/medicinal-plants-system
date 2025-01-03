import { useEffect, useState } from "react";

export function useEditMonograph(monograph: Monograph, setOpenModal: (x: boolean) => void) {
  const [name, setName] = useState(monograph.Name);
  const [family, setFamily] = useState(monograph.family);
  const [hab, setHab] = useState(monograph.Hab);
  const [des, setDes] = useState(monograph.Des);
  const [cmp, setCmp] = useState(monograph.Cmp);
  const [use, setUse] = useState(monograph.Use);
  const [pro, setPro] = useState(monograph.Pro);
  const [cul, setCul] = useState(monograph.Cul);
  const [app, setApp] = useState(monograph.App);
  const [sy, setSy] = useState(monograph.Sy);
  const [vul, setVul] = useState(monograph.Vul);
  const [bib, setBib] = useState(monograph.Bib);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setName(monograph.Name);
    setFamily(monograph.family);
    setHab(monograph.Hab);
    setDes(monograph.Des);
    setCmp(monograph.Cmp);
    setUse(monograph.Use);
    setPro(monograph.Pro);
    setCul(monograph.Cul);
    setApp(monograph.App);
    setSy(monograph.Sy);
    setVul(monograph.Vul);
    setBib(monograph.Bib);
  }, [monograph, flag]);

  function handleSaveClose() {
    setOpenModal(false);
    handleSave();
  }

  function handleSave() {
    console.log("Saving...");

    setFlag(!flag);

    const finalName = name.trim() === "" ? monograph.Name : name;
    const finalFamily = family.trim() === "" ? monograph.family : family;
    const finalHab = hab.trim() === "" ? monograph.Hab : hab;
    const finalDes = des.trim() === "" ? monograph.Des : des;
    const finalCmp = cmp.trim() === "" ? monograph.Cmp : cmp;
    const finalUse = use.trim() === "" ? monograph.Use : use;
    const finalPro = pro.trim() === "" ? monograph.Pro : pro;
    const finalCul = cul.trim() === "" ? monograph.Cul : cul;
    const finalApp = app.trim() === "" ? monograph.App : app;

    // Filter empty strings and replace with original values or remove them
    const tempSy = sy.map((synonym, index) =>
      synonym.trim() === "" && monograph.Sy[index]
        ? monograph.Sy[index]
        : synonym
    );
    const finalSy = tempSy.filter((synonym) => synonym.trim() !== "");
    const tempVul = vul.map((vulgarN, index) =>
      vulgarN.trim() === "" && monograph.Vul[index]
        ? monograph.Vul[index]
        : vulgarN
    );
    const finalVul = tempVul.filter((vulgarN) => vulgarN.trim() !== "");
    const tempBib = bib.map((bibliography, index) =>
      bibliography.trim() === "" && monograph.Bib[index]
        ? monograph.Bib[index]
        : bibliography
    );
    const finalBib = tempBib.filter(
      (bibliography) => bibliography.trim() !== ""
    );

    console.log(`Name: ${finalName}`);
    console.log(`Family: ${finalFamily}`);
    console.log(`Hab: ${finalHab}`);
    console.log(`Des: ${finalDes}`);
    console.log(`Cmp: ${finalCmp}`);
    console.log(`Use: ${finalUse}`);
    console.log(`Pro: ${finalPro}`);
    console.log(`Cul: ${finalCul}`);
    console.log(`App: ${finalApp}`);
    console.log(`Sy:`);
    console.log(finalSy);
    console.log(`Vul:`);
    console.log(finalVul);
    console.log(`Bib:`);
    console.log(finalBib);

    //////////////////////////////////////////////////
    //////// 🚨🚨Implementar solicitud🚨🚨 /////////
    ////////////////////////////////////////////////
  }

  return { name, setName, family, setFamily, hab, setHab, des, setDes, cmp, setCmp, use, setUse, pro, setPro, cul, setCul, app, setApp, sy, setSy, vul, setVul, bib, setBib, handleSave, handleSaveClose };
}
