import { updateCards } from "./card";

export default function initSearch(): void {
  const input = document.getElementById("search");
  input?.addEventListener("input", updateCards);
}
