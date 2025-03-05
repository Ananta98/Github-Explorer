import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
