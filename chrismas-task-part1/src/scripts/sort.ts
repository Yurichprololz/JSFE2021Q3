import { sort } from "./card";

const select = document.getElementById("sort") as HTMLSelectElement;
select.addEventListener("change", sort);
