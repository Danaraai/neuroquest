"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, RotateCcw, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore, selectDueReviewCount } from "@/lib/store";

const NAV_ITEMS = [
  { href: "/home",    label: "Home",   icon: Home },
  { href: "/map",     label: "Map",    icon: Map },
  { href: "/review",  label: "Review", icon: RotateCcw },
  { href: "/profile", label: "Me",     icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const dueCount = useStore(selectDueReviewCount);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{ background: "#1A1B2E", borderTop: "1px solid #3A3D5C" }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const showBadge = href === "/review" && dueCount > 0;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl transition-all",
                active
                  ? "text-[#58CC02]"
                  : "text-[#6B7094] hover:text-[#AFAFAF]"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn("w-6 h-6 transition-transform", active && "scale-110")}
                  strokeWidth={active ? 2.5 : 2}
                />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FF4B4B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {dueCount > 9 ? "9+" : dueCount}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold transition-all",
                  active ? "opacity-100" : "opacity-70"
                )}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {label}
              </span>
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#58CC02]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
