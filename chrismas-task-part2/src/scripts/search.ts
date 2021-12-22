import { updateCards } from "./card";

export default function initSearch(): void {
  const input = document.getElementById("search") as HTMLInputElement;
  input.addEventListener("input", updateCards);
}
