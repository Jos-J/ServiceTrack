// server/src/utils/normalize.ts
export function normalizeNullsToUndefined<T>(obj: T): T {
  if (obj === null) return undefined as unknown as T;

  if (Array.isArray(obj)) {
    return obj.map(normalizeNullsToUndefined) as unknown as T;
  }

  if (typeof obj === "object") {
    const copy: any = { ...(obj as any) };
    Object.keys(copy).forEach((k) => {
      copy[k] = normalizeNullsToUndefined(copy[k]);
    });
    return copy as T;
  }

  return obj;
}
