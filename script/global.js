// DOM
const searchBar = document.querySelector("#search input[type=search]");
const searchButton = document.querySelector("#search button");
const result = document.querySelector("#result");
const recipsCount = document.querySelector(".recipsCount>p");

const ButtonIngredients = document.querySelector(".ingredients button");

const divIngredientsBlockSelect = document.querySelector(
  ".ingredients .blockSelect",
);
const divIngredientsBlockActif = document.querySelector(
  ".ingredients .block-actif",
);
const ButtonDevices = document.querySelector(".devices button");

const divDevicesBlockSelect = document.querySelector(".devices .blockSelect");
const divDevicesBlockActif = document.querySelector(".devices .block-actif");

const ButtonUtensils = document.querySelector(".utensils button");

const divUtensilsBlockSelect = document.querySelector(".utensils .blockSelect");
const divUtensilsBlockActif = document.querySelector(".utensils .block-actif");

const closeButtons = document.querySelectorAll(".actif>i");

// Hook
const GlobalRecipes = {
  value: [],
  setValue(newValue) {
    if (newValue != this.value) {
      this.value = newValue;

      GlobalRecipesCount.setValue(this.value);

      result.textContent = "";
      this.value.map((recipe) => {
        newCard(recipe);
      });
    }
    return;
  },
};

const GlobalRecipesCount = {
  value: [],
  setValue(newValue) {
    if (newValue != this.value) {
      this.value = newValue;
      if (this.value.length == 0 || this.value.length == 1) {
        recipsCount.textContent = `${this.value.length} recette`;
      } else {
        recipsCount.textContent = `${this.value.length} recettes`;
      }
    }
    return;
  },
};

const GlobalSearch = {
  value: "",
  setValue(newValue) {
    if (newValue != this.value) {
      this.value = newValue;
    }
    return;
  },
};

const GlobalIngredientTag = {
  value: "",
  setValue(newValue) {
    if (newValue != this.value) {
      this.value = newValue;
    }
    return;
  },
};

const GlobalDeviceTag = {
  value: "",
  setValue(newValue) {
    if (newValue != this.value) {
      this.value = newValue;
    }
    return;
  },
};

const GlobalUtensilTag = {
  value: "",
  setValue(newValue) {
    if (newValue != this.value) {
      this.value = newValue;
    }
    return;
  },
};
