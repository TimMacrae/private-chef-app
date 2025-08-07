"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "@/components/ui/sidebar";

interface NavigationItemProps {
  url: string;
  title: string;
  icon: React.ReactNode;
  dataTestId?: string;
  itemColor: string;
  activeColor: string;
}

export function NavigationItem({
  url,
  title,
  icon: icon,
  dataTestId,
  itemColor,
  activeColor,
}: NavigationItemProps) {
  const pathname = usePathname();

  return (
    <SidebarMenuButton asChild data-testid={dataTestId}>
      <Link
        href={url}
        data-testid={dataTestId}
        className={cn(itemColor, pathname === url && activeColor)}
      >
        {icon ? icon : null}
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
}
