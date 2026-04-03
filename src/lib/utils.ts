import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toUpper(text: string): string {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
}
