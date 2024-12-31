import { useState } from "react";

export function useSidebar(categories: SidebarItem[]) {
    const [mobileOpenMenu, setMobileOpenMenu] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<React.ReactNode>(categories[0].element)
  
    function selectCategory(node: React.ReactNode){
      setSelectedCategory(node);
      setMobileOpenMenu(false);
    }

    return {
        mobileOpenMenu, setMobileOpenMenu, selectedCategory, selectCategory
    };
}