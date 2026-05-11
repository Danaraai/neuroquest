"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore, selectDueReviewCount } from "@/lib/store";

const ACCENT = "#00DCFF";

const NAV_ITEMS = [
  { href: "/home",    label: "Home",   emoji: "🏠" },
  { href: "/map",     label: "Map",    emoji: "🗺️" },
  { href: "/review",  label: "Review", emoji: "🔄" },
  { href: "/profile", label: "Me",     emoji: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();
  const dueCount = useStore(selectDueReviewCount);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{
        background: "rgba(8,10,24,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        height: 80,
      }}
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-[10px] pb-3">
        {NAV_ITEMS.map(({ href, label, emoji }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const showBadge = href === "/review" && dueCount > 0;

          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-1 cursor-pointer"
              style={{ opacity: active ? 1 : 0.45 }}
            >
              <span className="text-[22px] leading-none">{emoji}</span>
              <span
                className="text-[10px] font-bold"
                style={{ color: active ? ACCENT : "#6A70A0", fontFamily: "var(--font-display)" }}
              >
                {label}
              </span>
              {active && (
                <div
                  className="absolute -bottom-1"
                  style={{ width: 4, height: 4, borderRadius: "50%", background: ACCENT }}
                />
              )}
              {showBadge && (
                <span className="absolute -top-1 -right-1 bg-[#FF4B4B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {dueCount > 9 ? "9+" : dueCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
