import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};
