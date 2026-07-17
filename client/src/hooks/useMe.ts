// client/src/hooks/useMe.ts
import { useEffect, useState } from "react";
import { getMyUserProfile, type UserMe } from "../api/users.api";

export function useMe(enabled: boolean = true) {
  const [me, setMe] = useState<UserMe | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const result = await getMyUserProfile();
        if (!cancelled) setMe(result.data);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load profile";
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { me, loading, error };
}
