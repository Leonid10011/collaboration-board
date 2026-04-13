export type SupabaseErrorLike = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

export const formatSupabaseError = (error: unknown): string => {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const e = error as SupabaseErrorLike;
  return [
    e.code ? `code=${e.code}` : null,
    e.message ? `message=${e.message}` : null,
    e.details ? `details=${e.details}` : null,
    e.hint ? `hint=${e.hint}` : null,
  ]
    .filter(Boolean)
    .join(" | ");
};
