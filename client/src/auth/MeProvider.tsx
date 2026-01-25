//client / auth / provider

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isLoggedIn, clearToken } from "./auth";
import { getMyUserProfile, type UserMe } from "../api/users.api";

type MeCtx = {
  me: UserMe | null;
  loading: boolean;
  refreshMe: () => Promise<void>;
  setMe: React.Dispatch<React.SetStateAction<UserMe | null>>;
};

const MeContext = createContext<MeCtx | null>(null);

export function useMeContext() {
  const ctx = useContext(MeContext);
  if (!ctx) throw new Error("useMeContext must be used inside <MeProvider />");
  return ctx;
}

export function MeProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<UserMe | null>(null);
  const [loading, setLoading] = useState(false);

  async function refreshMe() {
    if (!isLoggedIn()) {
      setMe(null);
      return;
    }

    setLoading(true);
    try {
      const result = await getMyUserProfile();
      setMe(result.data);
    } catch {
      clearToken
      setMe(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshMe();
    // also refresh when token changes in this tab by listening to storage events
    const onStorage = () => refreshMe();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ me, loading, refreshMe, setMe }), [me, loading]);

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
}
