import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { NavigationSidebar } from "./navigation-sidebar";

export async function SidebarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      style={{ ["--sidebar-width" as string]: "12rem" } as React.CSSProperties}
      defaultOpen={defaultOpen}
    >
      <NavigationSidebar data-testid="navigation-sidebar" />
      <main className="w-full p-4">
        <SidebarTrigger
          className="md:hidden mb-2 border-1"
          data-testid="sidebar-trigger-mobile"
        />
        {children}
      </main>
    </SidebarProvider>
  );
}
