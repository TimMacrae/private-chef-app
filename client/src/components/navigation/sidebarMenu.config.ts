import {
  Calendar,
  Home,
  Pizza,
  Heart,
  Settings,
  Users,
  Utensils,
  BookHeart,
  GalleryVerticalEnd,
  HeartHandshake,
} from "lucide-react";

export type SidebarMenuItem = {
  title: string;
  url: string; // Route path
  icon?: React.ElementType; // Optional: for icon components
  children?: SidebarMenuItem[]; // Optional: for nested menus
  disabled?: boolean; // Optional: for disabled state
};

// Menu items.
export const sidebarMenu: SidebarMenuItem[] = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Recipe",
    url: "#",
    icon: Pizza,
  },
  {
    title: "Weekly recipes",
    url: "#",
    icon: Calendar,
  },
];

export const sidebarMenuCommunity: SidebarMenuItem[] = [
  {
    title: "Favorites",
    url: "#",
    icon: Heart,
  },
  {
    title: "History",
    url: "#",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Trending recipes",
    url: "#",
    icon: HeartHandshake,
  },
];

export const sidebarMenuSettings: SidebarMenuItem[] = [
  {
    title: "Preferences",
    url: "#",
    icon: BookHeart,
  },
  {
    title: "Meal planning",
    url: "#",
    icon: Utensils,
  },
  {
    title: "Collaboration",
    url: "#",
    icon: Users,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
