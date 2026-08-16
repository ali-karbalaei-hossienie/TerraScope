import type { ReactNode } from "react";

export interface ConfigType {
  id: ActiveMenuType;
  textButton: string;
  position: "top" | "bottom";
  component: ReactNode;
  icon: ReactNode;
}

export interface SidebarProviderProps {
  config: ConfigType[];
  children: ReactNode;
}

export type ActiveMenuType = "discover" | "weather" | "timeLapse";

export interface SidebarContextType {
  activeMenu: ActiveMenuType | null;
  isMenuOpen: boolean;
}
