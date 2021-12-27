const changeTreeHandle = (e: Event): void => {
  const area = document.getElementById("area") as HTMLAreaElement;
  const tree = document.getElementById("tree") as HTMLImageElement;
  const treeWrap = document.querySelector(".tree") as HTMLDivElement;

  let target = e.target as HTMLDivElement;
  target = target.closest("div") as HTMLDivElement;
  const index = Number(target.dataset.path) - 1;

  treeWrap.dataset.count = `${target.dataset.path}`;
  area.coords = getCoords(index);
  tree.src = `./assets/images/tree/${target.dataset.path}.png`;

  localStorage.setItem("treeSrc", tree.src);
  localStorage.setItem("treeArea", `${index}`);
  localStorage.setItem("count", `${treeWrap.dataset.count}`);
};

const getCoords = (index: number): string => {
  const winWidth = document.body.clientWidth;
  if (winWidth > 1366) {
    return [
      "252,3,240,10,237,48,214,44,209,64,217,78,197,80,206,99,213,130,206,144,172,127,157,140,188,172,170,192,197,217,162,219,120,209,106,230,190,262,125,262,127,279,178,291,120,309,123,339,179,335,149,362,83,348,73,370,125,396,116,428,31,430,20,459,60,465,52,490,90,505,81,532,11,537,5,571,56,575,32,594,49,617,94,589,100,605,65,621,72,645,123,629,104,671,137,687,164,646,181,701,212,700,224,664,240,668,237,692,281,694,288,659,303,698,333,695,372,688,369,660,434,670,451,653,423,635,456,634,465,609,468,582,439,570,490,567,490,534,438,532,424,504,410,476,448,473,450,440,408,437,411,406,346,418,333,411,363,392,423,373,424,345,379,355,376,327,353,330,352,305,387,305,392,277,341,266,403,240,390,215,351,231,346,218,347,182,329,181,359,157,345,135,309,165,313,126,279,128,274,107,305,83,297,67,272,74,284,54,264,39",
      "251,3,135,267,85,370,40,485,21,552,47,610,3,632,74,623,90,639,142,663,109,685,137,703,184,674,233,656,265,671,304,684,321,660,356,686,372,689,351,658,466,652,421,627,483,605,448,586,491,585,445,572,473,528,438,518,456,494,411,472,405,458,447,449,405,443,395,420,425,409,392,368,357,373,370,347,384,321,363,312,383,282,329,319,356,268,319,269,376,246,355,240,360,225,327,239,321,221,344,203,320,193,314,165,316,137",
      "238,7,210,59,209,92,187,117,194,144,155,216,174,231,148,237,120,312,108,357,82,431,60,489,44,529,79,549,24,570,55,582,11,609,25,639,51,636,49,653,68,650,62,668,95,665,121,670,156,658,134,688,151,698,179,686,208,676,214,653,231,665,220,686,241,688,270,671,279,689,315,700,329,688,349,681,381,664,372,632,406,662,428,666,446,658,470,657,477,640,457,613,451,601,479,607,480,580,445,573,485,568,453,552,476,546,440,505,456,487,443,454,416,473,409,459,426,457,422,429,419,415,438,411,411,406,410,384,398,370,409,355,385,343,370,325,391,321,360,315,376,292,366,274,376,272,366,261,372,249,341,250,353,235,314,227,335,216,348,198,328,184,332,157,318,138,311,128,320,117,295,118,300,93,280,89,289,57,269,58,275,42,255,42",
      "241,1,243,45,224,30,233,54,211,54,224,76,194,74,230,89,231,102,207,93,188,111,190,135,166,151,188,159,171,167,175,190,134,203,173,218,152,232,129,267,132,301,88,312,137,321,97,349,126,370,88,368,71,398,125,391,118,412,88,438,106,456,79,449,41,478,102,476,67,514,45,536,80,550,66,568,46,559,47,578,6,593,42,595,38,620,9,629,38,636,14,655,61,641,76,659,90,673,82,703,117,676,151,663,169,677,179,658,209,667,197,681,237,672,223,685,246,685,263,706,258,684,285,691,293,677,330,696,309,671,330,673,324,657,343,658,352,683,364,667,436,698,425,677,406,661,417,654,408,640,458,641,428,619,428,606,486,615,458,597,435,564,409,547,398,537,404,522,442,523,418,493,394,494,400,478,379,477,397,462,440,460,401,446,405,430,381,444,352,419,395,424,413,418,399,409,417,402,391,392,385,370,367,364,356,366,347,340,402,346,371,323,391,316,357,294,340,291,352,274,327,274,325,253,357,264,325,241,326,230,359,230,320,219,318,205,330,202,314,192,302,183,301,175,330,172,301,164,295,149,318,145,296,137,294,124,285,100,271,91,281,78,257,74,272,59,258,55,259,36,249,37",
      "250,11,243,40,229,59,224,79,202,104,231,118,227,138,197,125,200,141,186,160,216,173,203,183,176,171,173,177,199,194,173,198,185,214,158,230,181,240,200,236,204,254,167,245,157,256,171,268,140,278,141,288,176,289,175,320,136,301,140,318,122,328,167,329,159,350,153,363,120,343,119,353,143,375,121,382,125,392,162,394,139,404,123,409,110,397,109,413,84,415,86,435,115,442,133,454,96,466,69,460,65,469,112,499,70,508,52,518,65,530,45,540,89,539,119,554,34,570,66,605,15,611,16,625,81,635,55,655,59,666,109,657,75,684,94,690,133,672,135,689,143,695,154,678,167,684,180,658,218,650,196,679,209,685,228,663,228,689,249,689,260,673,285,696,294,691,274,650,305,658,300,673,316,693,337,687,345,686,355,699,366,696,340,662,369,676,376,677,371,662,421,685,429,671,411,657,421,646,409,637,485,636,486,617,414,612,469,589,435,563,443,547,386,557,444,528,424,505,376,506,415,481,401,474,366,495,359,487,392,470,358,455,386,447,415,426,389,422,398,403,388,399,364,426,334,433,349,419,327,398,375,397,377,385,350,381,382,354,376,344,346,365,337,340,360,339,345,331,361,320,343,316,330,327,333,303,322,299,315,317,307,297,305,287,342,288,343,279,329,274,345,262,316,264,329,255,323,246,303,260,304,241,337,226,324,220,306,224,319,205,305,209,299,196,318,184,302,186,285,180,307,150,296,139,286,126,278,142,265,123,289,109,271,107,281,88,271,60,253,60,263,37,257,26,251,42",
      "250,2,247,64,228,46,226,55,232,80,204,73,200,98,210,117,187,118,184,141,175,157,153,143,175,194,161,208,133,197,133,207,171,235,115,255,115,264,159,271,128,284,102,280,101,289,136,313,114,336,94,326,93,349,111,357,60,361,63,368,117,374,117,392,81,382,98,413,74,418,50,432,72,436,89,455,55,463,81,486,55,491,23,512,29,521,75,523,67,532,36,543,27,561,49,596,6,617,53,636,73,642,60,654,89,656,113,657,103,672,113,676,127,666,136,677,187,666,165,681,173,695,194,694,232,684,254,697,277,690,299,704,307,694,294,681,343,686,334,671,374,676,401,667,412,651,422,648,427,639,477,644,455,633,475,620,439,614,451,597,443,582,492,582,489,569,461,571,471,551,439,559,445,543,464,534,433,523,458,508,417,495,448,481,411,469,450,463,390,423,428,414,400,391,377,384,440,378,405,364,413,345,381,332,364,325,372,313,399,310,361,296,394,281,390,272,361,272,366,257,386,246,343,230,343,210,366,193,338,197,341,173,343,157,321,168,326,133,315,112,301,116,303,87,289,81,273,92,290,63,290,35,263,65,265,5",
    ][index];
  }
  return [
    "249,0,238,10,237,55,220,43,206,50,212,78,198,75,190,92,208,107,200,114,211,138,200,146,173,122,153,141,190,172,172,175,167,193,200,219,168,211,160,220,117,204,103,230,147,251,188,251,188,264,125,255,119,276,159,287,172,299,122,307,122,339,142,343,177,333,146,361,79,344,74,370,115,383,109,423,107,433,28,429,21,456,54,467,40,480,54,498,106,464,135,469,92,485,79,498,86,509,107,508,82,538,6,535,7,571,53,575,25,593,50,618,96,588,97,606,64,617,68,646,125,631,102,669,111,686,132,688,159,648,180,701,211,700,216,665,240,665,231,679,251,701,278,695,289,671,299,700,331,696,333,666,345,695,374,691,370,660,396,656,429,672,451,651,426,631,459,634,455,599,469,589,449,572,487,566,493,532,440,528,427,505,408,499,418,475,445,473,452,440,416,433,406,402,343,418,354,405,367,385,427,373,423,342,386,355,374,326,353,323,346,305,389,303,393,276,333,265,404,239,388,212,350,234,351,212,348,183,328,187,359,158,346,132,309,162,317,128,302,115,276,124,277,106,312,82,297,61,277,74,290,47,265,36,265,4",
    "177,1,171,6,172,32,153,28,158,48,149,49,152,60,136,63,148,79,128,82,137,100,124,99,123,110,133,130,117,126,106,139,130,155,118,166,106,150,95,163,106,188,92,193,97,211,75,211,80,252,62,259,73,276,66,287,83,305,56,307,46,320,75,338,33,338,31,354,56,372,26,368,39,393,37,406,12,387,17,412,35,429,3,440,38,435,61,443,55,454,81,452,97,467,72,481,94,483,95,493,130,469,164,461,181,469,186,482,192,472,219,482,216,467,231,474,234,487,241,480,269,488,244,463,277,457,298,468,330,456,293,437,335,422,318,414,344,408,315,401,314,386,325,383,334,368,310,365,316,346,304,328,285,323,312,314,281,309,272,293,298,288,281,277,282,245,263,235,271,220,255,220,270,197,235,215,249,186,227,185,262,173,253,157,227,168,227,157,243,141,226,141,228,131,225,120,224,102,222,92,209,95,222,72,201,84,209,58,195,62,207,48,191,51,194,34,180,30",
    "168,1,161,12,171,38,157,33,144,42,161,57,151,62,142,72,147,82,128,79,142,98,135,106,123,125,109,151,123,163,104,165,90,207,93,236,78,239,80,249,99,257,65,263,74,280,58,284,55,303,62,308,53,317,38,343,48,351,30,373,53,385,35,392,20,401,43,407,21,418,30,420,10,427,23,441,25,451,40,446,36,458,48,468,90,472,90,459,103,451,111,462,99,480,103,493,124,477,130,480,151,459,162,462,154,480,172,485,190,471,195,482,222,492,242,473,267,466,258,441,286,466,300,470,311,463,325,462,335,446,318,427,337,424,338,408,320,406,314,398,338,399,317,383,333,383,326,366,311,357,320,341,311,324,301,332,283,327,315,317,297,316,300,301,294,295,307,287,289,284,292,269,275,258,290,249,284,239,266,242,263,229,278,221,265,217,252,219,265,204,258,194,265,187,261,172,247,179,237,173,245,168,246,161,219,159,236,152,244,141,229,132,235,118,229,104,220,91,225,82,209,83,213,63,196,67,204,40,191,42,193,32,185,35,178,28",
    "169,1,171,33,158,21,161,38,146,37,158,52,140,52,166,66,160,70,142,64,131,95,111,105,130,113,119,119,123,134,95,143,122,154,106,162,107,180,84,192,90,209,60,218,118,215,121,230,96,220,77,232,68,245,80,246,86,257,65,260,50,280,77,272,87,286,64,299,32,330,77,331,53,354,33,374,60,380,31,392,35,398,6,413,37,423,21,426,18,455,45,450,53,459,68,449,74,460,57,464,59,495,91,466,102,461,118,475,127,458,132,466,148,469,138,477,157,470,169,469,158,477,174,479,181,494,187,493,181,479,201,483,203,471,230,486,215,470,234,463,247,478,254,468,283,483,306,487,293,477,302,472,289,463,285,448,321,447,301,437,299,420,338,430,321,417,308,397,288,379,277,380,279,364,308,364,292,343,273,343,260,325,306,321,283,312,285,303,266,309,246,293,276,297,290,291,281,286,293,280,274,270,258,255,244,254,245,239,279,241,258,226,271,220,242,203,248,191,230,188,227,178,250,184,228,169,229,159,254,163,231,152,222,141,218,127,208,125,234,118,211,116,203,104,222,103,204,96,210,87,197,66,187,68,197,56,182,51,183,42,191,39,180,35",
    "171,6,171,28,160,47,165,68,155,61,141,73,161,86,158,97,140,87,129,112,152,117,142,129,123,120,133,134,121,139,130,151,113,161,126,169,138,167,140,181,116,175,110,179,116,187,96,196,99,202,125,202,117,211,124,223,96,213,95,223,86,231,116,233,112,238,126,234,117,250,86,241,83,248,103,265,86,267,88,274,113,278,90,286,77,276,73,283,81,294,61,292,62,304,77,309,92,310,91,320,62,328,48,322,44,331,83,350,52,354,36,365,46,374,32,377,33,383,63,378,84,388,24,398,19,409,60,428,9,428,12,439,51,444,37,461,43,468,76,462,50,478,57,486,79,481,97,469,90,481,101,487,107,476,116,477,127,462,152,459,135,476,145,480,157,470,159,484,171,485,183,472,198,481,205,468,188,461,192,453,213,460,209,473,223,487,236,480,251,488,255,475,262,466,296,480,300,470,288,459,293,451,342,446,337,431,295,428,328,412,323,403,273,424,291,409,275,396,315,402,308,384,273,390,311,371,307,363,267,351,289,337,254,319,292,302,289,294,270,297,279,284,272,281,249,300,224,308,243,295,224,277,262,280,264,272,250,265,266,250,264,240,243,254,228,245,253,238,243,236,251,226,229,225,234,215,225,207,219,223,218,202,238,203,240,195,234,192,242,184,226,175,214,185,209,171,234,158,224,145,207,143,225,134,222,128,208,133,197,123,215,107,199,98,194,84,201,75",
    "183,8,175,9,170,52,159,34,164,56,146,55,148,86,132,85,127,115,106,103,109,114,123,139,115,150,95,139,90,147,119,166,84,180,80,187,109,192,90,201,71,198,70,206,96,225,77,236,68,230,64,245,80,252,43,251,45,260,80,263,80,273,56,270,66,294,49,294,38,303,63,318,38,326,56,344,40,347,17,358,19,365,50,365,36,376,20,391,37,418,4,432,38,446,54,443,43,458,77,461,72,471,81,474,137,467,112,478,122,488,162,480,174,492,196,486,210,492,205,482,240,482,236,471,260,476,280,467,294,452,340,451,313,442,333,435,311,431,314,419,311,410,344,408,322,399,328,386,302,394,311,378,323,372,299,366,321,355,297,346,316,337,286,329,314,326,276,299,297,291,270,269,307,270,306,261,282,255,291,243,269,235,263,222,278,218,253,205,276,199,276,191,251,190,258,175,269,170,241,161,238,150,255,134,236,136,243,109,228,113,230,93,220,90,225,80,211,79,214,62,187,63,203,46,204,25,186,45",
  ][index];
};

const changeTreeListerner = (): void => {
  const button = document.querySelectorAll(".tree-wrap_tree") as NodeListOf<HTMLDivElement>;
  button.forEach((element) => {
    element.addEventListener("click", changeTreeHandle);
  });
};

export { changeTreeListerner, getCoords };
