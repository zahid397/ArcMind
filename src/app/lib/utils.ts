import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// এই ফাংশনটা ক্লাস কনফ্লিক্ট সলভ করে
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
