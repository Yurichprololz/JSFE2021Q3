import "./scss/main.scss";
import { renderMainPage } from "./scripts/mainPage";
import { listenerForColorFilters } from "./scripts/color-filter";
import { listenerForFormFilters } from "./scripts/form-filter";
// renderMainPage();
import "./scripts/nouislider";
import "./scripts/card";
import "./scripts/search";

listenerForColorFilters();
listenerForFormFilters();
