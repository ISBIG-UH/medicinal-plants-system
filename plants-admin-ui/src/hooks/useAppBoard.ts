import { useEffect, useState } from "react";
import { apiGetApp, requestAppsList } from "../services/apiServices";

export function useAppBoard() {
  const [isOpen, setIsOpen] = useState(false);

  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingApp, setLoadingApp] = useState(false);

  async function reload(){
    setLoading(true);
    const list = await requestAppsList();
    setApps(list);
    setSelectedApp((await apiGetApp({ id: list[0].id })).app);
    setLoading(false);
  }

  async function reloadApp(){
    setLoadingApp(true);
    setSelectedApp((await apiGetApp(selectedApp ? { id: selectedApp.id } : { id: apps[0].id })).app);
    setLoadingApp(false);
  }

  useEffect(() => {
    reload()
  }, []);


  async function handleSelect(i: number) {
    if (selectedApp?.id === i) {
      return;
    }
    if (loadingApp) {
      return;
    }
    setLoadingApp(true);
    const selected = (await apiGetApp({ id: i })).app;
    setSelectedApp(selected);
    setLoadingApp(false);
  }

  return { isOpen, setIsOpen, apps, selectedApp, loading, loadingApp, handleSelect, reload, reloadApp }
}
