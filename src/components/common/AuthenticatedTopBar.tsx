"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, LogOut, Settings, SquarePen, UserCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import translations from "../../../assets/translations/jp";

interface AuthenticatedTopBarProps {
  companyName: string;
}

/**
 * Renders the logged-in top bar with a front-end-only user menu.
 *
 * @param props - Component props.
 * @param props.companyName - Static company name label.
 * @returns The authenticated top bar.
 */
export default function AuthenticatedTopBar({
  companyName,
}: AuthenticatedTopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const labels = translations.common.topBar;

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    /**
     * Closes the menu when a pointer event happens outside the menu area.
     *
     * @param event - The pointer event from the document.
     */
    function handlePointerDown(event: PointerEvent) {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/6 bg-white/68 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/Logo.png"
            alt=""
            width={160}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-slate-700 hover:bg-slate-100"
            aria-label={labels.notificationsLabel}
          >
            <Bell className="size-5" />
          </Button>
          <div ref={menuContainerRef} className="relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-700 hover:bg-slate-100"
              aria-expanded={isMenuOpen}
              aria-label={labels.userMenu.openLabel}
              onClick={() => {
                setIsMenuOpen((open) => !open);
              }}
            >
              <UserCircle2 className="size-6" />
            </Button>
            {isMenuOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.14)]">
                <div className="border-b border-slate-100 px-2 pb-3">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {labels.userMenu.companyLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {companyName}
                  </p>
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    className="justify-start rounded-xl px-3 py-2 text-sm text-slate-700"
                  >
                    <Settings className="size-4" />
                    {labels.userMenu.settingsLabel}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="justify-start rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="size-4" />
                    {labels.userMenu.logoutLabel}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
          <Button
            type="button"
            className="h-10 rounded-md bg-slate-800 px-4 text-white hover:bg-slate-700"
          >
            <SquarePen className="size-4" />
            {labels.postArticleLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}
