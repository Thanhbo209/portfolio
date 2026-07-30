"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { externalLinks } from "@/constants/navigation";
import { PrimaryNavList } from "@/components/layout/PrimaryNavList";
import { ExternalLinkItem } from "@/components/layout/ExternalLinkItem";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const TRANSITION_MS = 200;

export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = () => setVisible(false);

  // Drive the native <dialog> from `open`; the slide transform is driven
  // separately by `visible` so close() only fires after the exit transition.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    if (visible || !open) return;
    const timeout = setTimeout(() => {
      dialogRef.current?.close();
      setOpen(false);
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [visible, open]);

  // Escape is intercepted so it plays the same exit transition as any other close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      closeDrawer();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <Link href="/#overview" className="text-sm font-semibold tracking-tight text-sidebar-foreground">
          Portfolio
        </Link>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="flex size-9 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          aria-label="Open navigation menu"
        >
          <ListIcon className="size-5" weight="regular" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDrawer();
        }}
        aria-label="Navigation menu"
        className="fixed inset-y-0 left-0 m-0 h-auto w-72 max-w-[85vw] max-h-none border-0 bg-transparent p-0 backdrop:bg-black/40"
      >
        <div
          className={cn(
            "flex h-full w-72 max-w-[85vw] flex-col bg-sidebar transition-transform duration-200 ease-out motion-reduce:transition-none",
            visible ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              Menu
            </span>
            <button
              type="button"
              onClick={closeDrawer}
              className="flex size-9 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              aria-label="Close navigation menu"
            >
              <XIcon className="size-5" weight="regular" />
            </button>
          </div>

          <PrimaryNavList
            layoutGroupId="drawer-nav"
            animate={visible}
            onNavigate={closeDrawer}
            className="gap-1"
          />

          <div className="flex flex-col gap-1 border-t border-sidebar-border p-3">
            {externalLinks.map((link) => (
              <ExternalLinkItem key={link.label} link={link} />
            ))}
            <div className="mt-1 flex items-center justify-between px-3">
              <span className="text-xs text-sidebar-foreground/60">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
