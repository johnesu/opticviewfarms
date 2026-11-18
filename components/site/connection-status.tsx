"use client";

import { useEffect, useState } from "react";

/**
 * Reflects the browser's real connectivity. It is intentionally not a fake
 * "sync" indicator: queued-operation counts arrive with the offline engine.
 */
export function ConnectionStatus({ className = "" }: { className?: string }) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 border border-current/20 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] ${className}`}
      title={
        online
          ? "Connected. Marketplace actions are available."
          : "Offline. Farm records can still be entered and will queue locally."
      }
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full rounded-full ${
            online ? "animate-ping bg-bronze-400 opacity-60" : "bg-clay-400"
          }`}
        />
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            online ? "bg-bronze-500" : "bg-clay-500"
          }`}
        />
      </span>
      {online ? "Online" : "Offline"}
    </span>
  );
}
