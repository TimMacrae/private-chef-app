import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { apiConfig } from "@/lib/api/api-config";
import {
  sidebarMenu,
  sidebarMenuCommunity,
  sidebarMenuSettings,
} from "./sidebar-menu.config";
import { LogOut } from "lucide-react";

import { NavigationItem } from "./navigation-item";

export function NavigationSidebar() {
  const itemColor =
    "hover:text-white hover:!bg-primary/80 transition-colors duration-200 ease-in-out";
  const activeColor =
    "bg-primary text-white hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out";

  return (
    <Sidebar collapsible="icon" data-testid="sidebar">
      <SidebarHeader>
        <SidebarTrigger className="ml-0.5" data-testid="sidebar-trigger" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Generator</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavigationItem
                    url={item.url}
                    title={item.title}
                    icon={item.icon ? <item.icon /> : undefined}
                    dataTestId={item.dataTestId}
                    itemColor={itemColor}
                    activeColor={activeColor}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>History and Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuCommunity.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavigationItem
                    url={item.url}
                    title={item.title}
                    icon={item.icon ? <item.icon /> : undefined}
                    dataTestId={item.dataTestId}
                    itemColor={itemColor}
                    activeColor={activeColor}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuSettings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavigationItem
                    url={item.url}
                    title={item.title}
                    icon={item.icon ? <item.icon /> : undefined}
                    dataTestId={item.dataTestId}
                    itemColor={itemColor}
                    activeColor={activeColor}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          asChild
          className="bg-primary text-white hover:text-white hover:bg-primary/80"
          data-testid="auth-logout"
        >
          <a href={apiConfig.URL.AUTH_LOGOUT}>
            <LogOut />
            <span>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
