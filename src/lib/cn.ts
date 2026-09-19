export type ClassValue = string | false | null | undefined;

/** Minimal className joiner (no dependency needed for MVP). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
