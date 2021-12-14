import "./scss/main.scss";
import { renderMainPage } from "./scripts/mainPage";
import { listenerForColorFilters } from "./scripts/color-filter";
import { listenerForFormFilters } from "./scripts/form-filter";
import { listenerForSizeFilters } from "./scripts/size-filter";
// renderMainPage();
import "./scripts/nouislider";
import "./scripts/card";
import "./scripts/search";

listenerForColorFilters();
listenerForFormFilters();
listenerForSizeFilters();
