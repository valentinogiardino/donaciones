import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function toLocalCurrency(amount:number){
  return amount.toLocaleString("es-AR", {style: "currency", currency: "ARS"})
}