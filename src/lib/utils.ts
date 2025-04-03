// lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de forma segura y ordenada.
 * Usa clsx para condicionales y twMerge para evitar duplicados.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}