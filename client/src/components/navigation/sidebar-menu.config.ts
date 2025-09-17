import { apiConfig } from "@/lib/api/api-config";
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
  icon: React.ElementType; // Optional: for icon components
  children?: SidebarMenuItem[]; // Optional: for nested menus
  disabled?: boolean; // Optional: for disabled state
  dataTestId: string; // Optional: for testing purposes
};

// Menu items.
export const sidebarMenu: SidebarMenuItem[] = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    dataTestId: "sidebar-item-home",
  },
  {
    title: "Recipe",
    url: "#",
    icon: Pizza,
    dataTestId: "sidebar-item-recipe",
  },
  {
    title: "Weekly recipes",
    url: "#",
    icon: Calendar,
    dataTestId: "sidebar-item-weekly-recipes",
  },
];

export const sidebarMenuCommunity: SidebarMenuItem[] = [
  {
    title: "Favorites",
    url: "#",
    icon: Heart,
    dataTestId: "sidebar-item-favorites",
  },
  {
    title: "History",
    url: "#",
    icon: GalleryVerticalEnd,
    dataTestId: "sidebar-item-history",
  },
  {
    title: "Trending recipes",
    url: "#",
    icon: HeartHandshake,
    dataTestId: "sidebar-item-trending-recipes",
  },
];

export const sidebarMenuSettings: SidebarMenuItem[] = [
  {
    title: "Preferences",
    url: apiConfig.URL.PREFERENCES,
    icon: BookHeart,
    dataTestId: "sidebar-item-preferences",
  },
  {
    title: "Meal planning",
    url: apiConfig.URL.MEAL_PLANNING,
    icon: Utensils,
    dataTestId: "sidebar-item-meal-planning",
  },
  {
    title: "Collaboration",
    url: apiConfig.URL.COLLABORATION,
    icon: Users,
    dataTestId: "sidebar-item-collaboration",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    dataTestId: "sidebar-item-settings",
  },
];
