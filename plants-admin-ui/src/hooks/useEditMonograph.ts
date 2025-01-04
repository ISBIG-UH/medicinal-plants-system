import { useEffect, useState } from "react";

export function useEditMonograph(monograph: Monograph, setOpenModal: (x: boolean) => void) {
  const [name, setName] = useState(monograph.Name);
  const [family, setFamily] = useState(monograph.family);
  const [subfamily, setSubfamily] = useState(monograph.subfamily);
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
    setFamily(monograph.subfamily);
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

  // function handleSaveClose() {
  //   setOpenModal(false);
  //   handleSave();
  // }

  function handleSave() {
    console.log("Saving...");
    setOpenModal(false);

    setFlag(!flag);

    
    // Required fileds
    const finalName = name.trim() === "" ? monograph.Name : name;


    // Remove only-spaces strings
    const finalFamily = family.trim() === "" ? "" : family;
    const finalSubfamily = subfamily.trim() === "" ? "" : subfamily;
    const finalHab = hab.trim() === "" ? "" : hab;
    const finalDes = des.trim() === "" ? "" : des;
    const finalCmp = cmp.trim() === "" ? "" : cmp;
    const finalUse = use.trim() === "" ? "" : use;
    const finalPro = pro.trim() === "" ? "" : pro;
    const finalCul = cul.trim() === "" ? "" : cul;
    const finalApp = app.trim() === "" ? "" : app;


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
    console.log(`Subfamily: ${finalSubfamily}`);
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

    // Update monograph
    //////////////////////////////////////////////////
    //////// 🚨🚨Implementar solicitud🚨🚨 /////////
    ////////////////////////////////////////////////
  }

  return { name, setName, family, setFamily, subfamily, setSubfamily, hab, setHab, des, setDes, cmp, setCmp, use, setUse, pro, setPro, cul, setCul, app, setApp, sy, setSy, vul, setVul, bib, setBib, handleSave };
}
