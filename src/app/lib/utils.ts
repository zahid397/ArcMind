import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join classNames together
 * and intelligently merge Tailwind CSS classes.
 *
 * This helps resolve class conflicts like:
 * "p-2 p-4" → "p-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
