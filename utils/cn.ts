import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Utility to merge Tailwind CSS classes efficiently.
 * - clsx: Handles conditional classes (objects, arrays, falsy values).
 * - twMerge: Resolves Tailwind conflicts by ensuring the last class wins (e.g., 'p-2' over 'p-4').
*/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

