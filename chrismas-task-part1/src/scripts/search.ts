import { updateCards } from "./card";

export default function initSearch() {
  const input = document.getElementById("search");
  input?.addEventListener("input", updateCards);
}
