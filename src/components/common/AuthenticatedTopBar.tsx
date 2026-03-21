"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  FileText,
  LogOut,
  ReceiptText,
  Settings,
  SquarePen,
  UserCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import translations from "../../../assets/translations/jp";

interface AuthenticatedTopBarProps {
  companyName: string;
}

interface TopBarNotificationItem {
  id: string;
  label: string;
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
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] =
    useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notificationContainerRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const labels = translations.common.topBar;
  const notificationItems: TopBarNotificationItem[] =
    labels.notificationsMenu.items.map((label, index) => ({
      id: `notification-${index + 1}`,
      label,
    }));

  useEffect(() => {
    if (!isNotificationMenuOpen && !isUserMenuOpen) {
      return;
    }

    /**
     * Closes dialogs when a pointer event happens outside their area.
     *
     * @param event - The pointer event from the document.
     */
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        notificationContainerRef.current &&
        !notificationContainerRef.current.contains(target)
      ) {
        setIsNotificationMenuOpen(false);
      }

      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(target)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isNotificationMenuOpen, isUserMenuOpen]);

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
          <div ref={notificationContainerRef} className="relative">
            <div className="relative inline-flex">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-700 hover:bg-slate-100"
                aria-expanded={isNotificationMenuOpen}
                aria-label={labels.notificationsLabel}
                onClick={() => {
                  setIsNotificationMenuOpen((open) => !open);
                  setIsUserMenuOpen(false);
                }}
              >
                <Bell className="size-5" />
              </Button>
              <span className="pointer-events-none absolute right-1 top-1 size-2 rounded-full bg-red-500" />
            </div>
            {isNotificationMenuOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.14)]">
                <div className="flex flex-col">
                  {notificationItems.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-slate-100 px-3 py-3 text-sm text-slate-700 last:border-b-0"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-2 w-full justify-start rounded-xl px-3 py-2 text-sm text-slate-700"
                >
                  <Link href="/notifications">
                    {labels.notificationsMenu.viewAllLabel}
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
          <div ref={menuContainerRef} className="relative">
            <div className="relative inline-flex">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-700 hover:bg-slate-100"
                aria-expanded={isUserMenuOpen}
                aria-label={labels.userMenu.openLabel}
                onClick={() => {
                  setIsUserMenuOpen((open) => !open);
                  setIsNotificationMenuOpen(false);
                }}
              >
                <UserCircle2 className="size-6" />
              </Button>
              <span className="pointer-events-none absolute right-1 top-1 size-2 rounded-full bg-red-500" />
            </div>
            {isUserMenuOpen ? (
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
                    asChild
                    variant="ghost"
                    className="justify-start rounded-xl px-3 py-2 text-sm text-slate-700"
                  >
                    <Link href="/my-articles">
                      <FileText className="size-4" />
                      {labels.userMenu.myArticlesLabel}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="justify-start rounded-xl px-3 py-2 text-sm text-slate-700"
                  >
                    <Link href="/invoices">
                      <ReceiptText className="size-4" />
                      {labels.userMenu.invoicesLabel}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="justify-start rounded-xl px-3 py-2 text-sm text-slate-700"
                  >
                    <Link href="/settings">
                      <Settings className="size-4" />
                      {labels.userMenu.settingsLabel}
                    </Link>
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
