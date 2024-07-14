import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function tc<T>(
  promise: Promise<T>,
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (throwable) {
    if (throwable instanceof Error) return { data: null, error: throwable };
    throw throwable;
  }
}
