import React from "react";
import { beforeAll, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  sidebarMenu,
  sidebarMenuCommunity,
  sidebarMenuSettings,
} from "../sidebar-menu.config";

// Mock window.matchMedia
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        media: "",
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    };
});

describe("NavigationSidebar", () => {
  test("renders without crashing", () => {
    render(
      <SidebarProvider defaultOpen={true}>
        <NavigationSidebar />
      </SidebarProvider>
    );
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  test("contains sidebar trigger", () => {
    render(
      <SidebarProvider defaultOpen={true}>
        <NavigationSidebar />
      </SidebarProvider>
    );
    const trigger = screen.getByTestId("sidebar-trigger");
    expect(trigger).toBeInTheDocument();
  });

  test("contains sidebar menu items", () => {
    render(
      <SidebarProvider defaultOpen={true}>
        <NavigationSidebar />
      </SidebarProvider>
    );
    [...sidebarMenu, ...sidebarMenuCommunity, ...sidebarMenuSettings].forEach(
      (item) => {
        const menuItem = screen.getByTestId(item.dataTestId);
        expect(menuItem).toBeInTheDocument();
      }
    );
  });
});
