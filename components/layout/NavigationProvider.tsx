"use client";

import { createContext, useContext } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";

interface NavigationContextValue {
  activeId: string;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

interface NavigationProviderProps {
  sectionIds: string[];
  children: React.ReactNode;
}

/**
 * Presentation-agnostic: this file knows nothing about labels, icons, or any
 * particular nav surface (Sidebar, MobileNavDrawer, ...). It only tracks which
 * of the given section ids is currently active and exposes that fact via
 * context, so it stays reusable for whatever consumes it as the app grows.
 */
export function NavigationProvider({ sectionIds, children }: NavigationProviderProps) {
  const activeId = useScrollSpy(sectionIds);

  return (
    <NavigationContext.Provider value={{ activeId }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  return context;
}
