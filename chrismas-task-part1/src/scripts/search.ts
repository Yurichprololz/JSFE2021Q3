import { updateCards } from "./card";

const input = document.getElementById("search");

input?.addEventListener("input", updateCards);
