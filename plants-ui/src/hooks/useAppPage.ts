import { useEffect, useState } from "react";
import { requestApp, requestAppsList } from "../services/apiServices";

export function useAppPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingApp, setLoadingApp] = useState(false);

  useEffect(() => {
    async function loadFirstValues() {
      setLoading(true);
      const list = await requestAppsList();
      setApps(list);
      setSelectedApp(await requestApp(list[0].id));
      setLoading(false);
    }
    loadFirstValues();
  }, []);

  async function handleSelect(i: number) {
    if (selectedApp?.id === i) {
      return;
    }
    if (loadingApp) {
      return;
    }
    setLoadingApp(true);
    const selected = await requestApp(i);
    setSelectedApp(selected);
    setLoadingApp(false);
  }

  return { isOpen, setIsOpen, apps, selectedApp, loading, loadingApp, handleSelect }
}
