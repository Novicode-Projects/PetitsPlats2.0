// DOM
const searchBar = document.querySelector("#search input[type=search]");
const searchButton = document.querySelector("#search button");
const result = document.querySelector("#result");
const recipsCount = document.querySelector(".recipsCount>p");

const ButtonIngredients = document.querySelector(".ingredients button");

const divIngredientsBlockSelect = document.querySelector(
  ".ingredients .blockSelect"
);
const divIngredientsBlockActif = document.querySelector(
  ".ingredients .block-actif"
);
const ButtonDevices = document.querySelector(".devices button");

const divApplianceBlockSelect = document.querySelector(
  ".appliance .blockSelect"
);
const divApplianceBlockActif = document.querySelector(
  ".appliance .block-actif"
);

const ButtonUtensils = document.querySelector(".utensils button");

const divUtensilsBlockSelect = document.querySelector(".utensils .blockSelect");
const divUtensilsBlockActif = document.querySelector(".utensils .block-actif");

const closeButtons = document.querySelectorAll(".actif>i");

const GlobalFilter = {
  search: "",
  ingredient: "",
  appliance: "",
  ustensils: "",
  tagsArray: [],
};
