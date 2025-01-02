interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  element: React.ReactNode;
}

interface SidebarGroup {
  icon: React.ReactNode;
  items: SidebarItem[];
}