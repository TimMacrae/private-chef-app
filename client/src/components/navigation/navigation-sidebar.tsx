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

export function NavigationSidebar() {
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
                  <SidebarMenuButton asChild data-testid={item.dataTestId}>
                    <a href={item.url}>
                      {item.icon ? <item.icon /> : null}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
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
                  <SidebarMenuButton asChild data-testid={item.dataTestId}>
                    <a href={item.url}>
                      {item.icon ? <item.icon /> : null}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
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
                  <SidebarMenuButton asChild data-testid={item.dataTestId}>
                    <a href={item.url}>
                      {item.icon ? <item.icon /> : null}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          asChild
          className="bg-secondary"
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
