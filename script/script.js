// Search Button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  GlobalFilter.search = searchBar.value;
  recipesFilter({ isStart: false });
});

// Result Cards DOM
const resultCardsDOM = (recipesArray) => {
  result.textContent = "";

  ulTagDOM("appliance", recipesArray, "");
  ulTagDOM("ingredients", recipesArray, "");

  ulTagDOM("ustensils", recipesArray, "");

  if (recipesArray.length == 0) {
    const p = document.createElement("p");
    p.style.fontFamily = "Manrope";
    p.textContent = `Aucune recette ne contient « ${GlobalFilter.search} ». Vous pouvez chercher «
    tarte aux pommes », « poisson », etc.`;

    result.appendChild(p);
  } else {
    for (const recipe of recipesArray) {
      newRecipeCard(recipe);
    }
  }
};

// Filter
const recipesFilter = ({ isStart }) => {
  const recipsCount = document.querySelector(".recipsCount p");

  if (GlobalFilter.search.length < 3 && !isStart) {
    recipsCount.textContent = `${recipes.length} Recettes`;

    resultCardsDOM(recipes);
  } else {
    const newRecipesArray = [];

    // GobalFilter
    const arrayFilter = {
      search: GlobalFilter.search != "" ? true : false,
      ingredient: false,
      appliance: false,
      ustensils: false,
    };

    for (const tagObject of GlobalFilter.tagsArray) {
      if (tagObject.tagName == "ingredients") {
        arrayFilter.ingredient = true;
      } else if (tagObject.tagName == "appliance") {
        arrayFilter.appliance = true;
      } else if (tagObject.tagName == "ustensils") {
        arrayFilter.ustensils = true;
      }
    }

    for (const recipe of recipes) {
      const arrayFilterCompare = {
        search: false,
        ingredient: false,
        appliance: false,
        ustensils: false,
      };

      // Search
      if (GlobalFilter.search != "") {
        const { name, ingredients, description } = recipe;

        const lowerName = name.toLowerCase();
        const lowerDescription = description.toLowerCase();
        const lowerGlobalFilterSearch = GlobalFilter.search.toLowerCase();

        const ingredientsBooleanArray = [];

        for (const ingredient of ingredients) {
          const lowerIngredient = ingredient.ingredient.toLowerCase();

          ingredientsBooleanArray.push(
            lowerIngredient.includes(lowerGlobalFilterSearch)
          );
        }

        if (
          lowerName.includes(lowerGlobalFilterSearch) ||
          ingredientsBooleanArray.find((ingredient) => ingredient === true) ||
          lowerDescription.includes(lowerGlobalFilterSearch)
        ) {
          arrayFilterCompare.search = true;
        }
      }

      for (tagObject of GlobalFilter.tagsArray) {
        const { tagName, content } = tagObject;

        // Ingredient
        if (tagName == "ingredients") {
          const { ingredients } = recipe;
          const lowerGlobalFilterIngredient = content;

          for (const ingredient of ingredients) {
            const lowerIngredient = ingredient.ingredient.toLowerCase();

            if (lowerIngredient.includes(lowerGlobalFilterIngredient)) {
              arrayFilterCompare.ingredient = true;
            }
          }
        }

        // Appliance
        if (tagName == "appliance") {
          const { appliance } = recipe;

          const lowerAppliance = appliance.toLowerCase();
          const lowerGlobalFilterAppliance = content;

          if (lowerAppliance.includes(lowerGlobalFilterAppliance)) {
            arrayFilterCompare.appliance = true;
          }
        }

        // Ustensils
        if (tagName == "ustensils") {
          const { ustensils } = recipe;
          const lowerGlobalFilterUstensils = content;

          for (const ustensil of ustensils) {
            const lowerUstensil = ustensil.toLowerCase();

            if (lowerUstensil.includes(lowerGlobalFilterUstensils)) {
              arrayFilterCompare.ustensils = true;
            }
          }
        }
      }

      if (
        Object.entries(arrayFilter).toString() ===
        Object.entries(arrayFilterCompare).toString()
      ) {
        newRecipesArray.push(recipe);
      }
    }

    recipsCount.textContent = `${newRecipesArray.length} Recettes`;

    resultCardsDOM(
      GlobalFilter.search == "" &&
        arrayFilter.ingredient == false &&
        arrayFilter.appliance == false &&
        arrayFilter.ustensils == false
        ? recipes
        : newRecipesArray
    );
  }
};

const generateTagLi = (tagName, tagArray) => {
  const ul = document.querySelector(`.${tagName} ul`);
  ul.textContent = "";

  for (const tagValue of tagArray) {
    const li = document.createElement("li");
    li.textContent = tagValue;

    li.addEventListener("click", ({ target }) => {
      const { textContent } = target;

      GlobalFilter.ingredient = textContent.toLowerCase();
      actifTag(tagName, textContent.toLowerCase());
      recipesFilter({ isStart: false });
    });

    ul.appendChild(li);
  }
};

const actifTag = (tagName, textContent) => {
  const actif = document.querySelector(`.${tagName} .actif`);
  const actifP = document.querySelector(`.${tagName} .actif p`);
  const blockActif = document.querySelector(`.${tagName} .block-actif`);
  const blockActifP = document.querySelector(`.${tagName} .block-actif p`);
  const blockActifI = document.querySelector(`.${tagName} .block-actif i`);

  if (GlobalFilter.tagsArray.length != 0) {
    let i = 0;

    for (const tagObject of GlobalFilter.tagsArray) {
      if (tagObject.tagName == tagName) {
        GlobalFilter.tagsArray[i].tagName = tagName;
        GlobalFilter.tagsArray[i].content = textContent;
      } else {
        GlobalFilter.tagsArray.push({ tagName: tagName, content: textContent });
      }

      i++;
    }
  } else {
    GlobalFilter.tagsArray.push({ tagName: tagName, content: textContent });
  }

  actifP.textContent = textContent.toLowerCase();
  blockActifP.textContent = textContent.toLowerCase();

  actif.classList.remove("hidden");
  blockActif.classList.add("hiddenActif");

  blockActifI.addEventListener("click", () => {
    closeActifButton(tagName);
  });

  recipesFilter({ isStart: false });
};

const closeActifButton = (tagName) => {
  const actif = document.querySelector(`.${tagName} .actif`);
  const blockActif = document.querySelector(`.${tagName} .block-actif`);

  GlobalFilter.tagsArray = GlobalFilter.tagsArray.filter(
    (obj) => obj.tagName != tagName
  );

  if (tagName == "ingredients") {
    GlobalFilter.ingredient = "";
  } else if (tagName == "appliance") {
    GlobalFilter.appliance = "";
  } else if (tagName == "ustensils") {
    GlobalFilter.ustensils = "";
  }

  actif.classList.add("hidden");
  blockActif.classList.add("hidden");
  blockActif.classList.remove("hiddenActif");

  recipesFilter({ isStart: false });
};

// Ul Tag
const ulTagDOM = (tagName, recipeArray, searchValue) => {
  const ul = document.querySelector(`.${tagName} ul`);
  ul.textContent = "";

  const arrayWithoutDuplicates = [];

  // With Search
  if (searchValue != "") {
    const lowerAndTrimSearch = searchValue.toLowerCase().trim();

    for (const recipe of recipeArray) {
      // TagName  = Ingredients

      if (tagName == "ingredients") {
        const { ingredients } = recipe;

        for (const ingredient of ingredients) {
          const lowerAndTrimIngredient = ingredient.ingredient
            .toLowerCase()
            .trim();

          const isIngredientDuplicates = arrayWithoutDuplicates.find(
            (ingredientInArray) => ingredientInArray == lowerAndTrimIngredient
          );

          if (
            (!isIngredientDuplicates || isIngredientDuplicates == undefined) &&
            lowerAndTrimIngredient.includes(lowerAndTrimSearch)
          ) {
            arrayWithoutDuplicates.push(lowerAndTrimIngredient);
          }
        }
      }

      // TagName  = Appliance
      else if (tagName == "appliance") {
        const { appliance } = recipe;
        const lowerAndTrimAppliance = appliance.toLowerCase().trim();

        const isApplianceDuplicates = arrayWithoutDuplicates.find(
          (applianceInArray) => applianceInArray == lowerAndTrimAppliance
        );

        if (
          (isApplianceDuplicates == false ||
            isApplianceDuplicates == undefined) &&
          lowerAndTrimAppliance.includes(lowerAndTrimSearch)
        ) {
          arrayWithoutDuplicates.push(lowerAndTrimAppliance);
        }
      }

      // TagName = Ustensils
      else if (tagName == "ustensils") {
        const { ustensils } = recipe;

        for (const ustensil of ustensils) {
          const lowerAndTrimUstensil = ustensil.toLowerCase().trim();

          const isUstensilDuplicates = arrayWithoutDuplicates.find(
            (ustensilInArray) => ustensilInArray == lowerAndTrimUstensil
          );

          if (
            (!isUstensilDuplicates || isUstensilDuplicates == undefined) &&
            lowerAndTrimUstensil.includes(lowerAndTrimSearch)
          ) {
            arrayWithoutDuplicates.push(lowerAndTrimUstensil);
          }
        }
      }
    }
  }

  // Without Search
  else {
    // TagName  = Ingredients

    for (const recipe of recipeArray) {
      if (tagName == "ingredients") {
        const { ingredients } = recipe;

        for (const ingredient of ingredients) {
          const lowerAndTrimIngredient = ingredient.ingredient
            .toLowerCase()
            .trim();

          const isIngredientDuplicates = arrayWithoutDuplicates.find(
            (ingredientInArray) => ingredientInArray == lowerAndTrimIngredient
          );

          if (!isIngredientDuplicates) {
            arrayWithoutDuplicates.push(lowerAndTrimIngredient);
          }
        }
      }

      // TagName  = Appliance
      else if (tagName == "appliance") {
        const { appliance } = recipe;
        const lowerAndTrimAppliance = appliance.toLowerCase().trim();

        const isApplianceDuplicates = arrayWithoutDuplicates.find(
          (applianceInArray) => applianceInArray == lowerAndTrimAppliance
        );

        if (!isApplianceDuplicates) {
          arrayWithoutDuplicates.push(lowerAndTrimAppliance);
        }
      }

      // TagName = Ustensils
      else if (tagName == "ustensils") {
        const { ustensils } = recipe;

        for (const ustensil of ustensils) {
          const lowerAndTrimUstensil = ustensil.toLowerCase().trim();

          const isUstensilDuplicates = arrayWithoutDuplicates.find(
            (ustensilInArray) => ustensilInArray == lowerAndTrimUstensil
          );

          if (!isUstensilDuplicates) {
            arrayWithoutDuplicates.push(lowerAndTrimUstensil);
          }
        }
      }
    }
  }

  const arrayWithoutDuplicatesOrderByAsc = arrayWithoutDuplicates.sort((a, b) =>
    a.localeCompare(b)
  );

  generateTagLi(tagName, arrayWithoutDuplicatesOrderByAsc);
};

// Tag
const tagDOM = (tagName, recipesArray) => {
  // Parent Tag
  const buttonTag = document.querySelector(`.${tagName} button`);
  const iconTag = document.querySelector(`.${tagName} i`);
  const inputSearch = document.querySelector(`.${tagName} input[type=search]`);

  const blockSelect = document.querySelector(`.${tagName} .blockSelect`);
  const blockActif = document.querySelector(`.${tagName} .block-actif`);

  let isIconUp = true;

  const actifI = document.querySelector(`.${tagName} .actif i`);

  actifI.addEventListener("click", () => closeActifButton(tagName));

  buttonTag.addEventListener("click", () => {
    if (blockActif.classList.contains("hiddenActif") && isIconUp) {
      blockActif.classList.add("hidden");
    }

    if (blockActif.classList.contains("hiddenActif") && !isIconUp) {
      blockActif.classList.remove("hidden");
    }

    if (isIconUp) {
      iconTag.classList.remove("fa-arrow-up");
      iconTag.classList.add("fa-arrow-down");
      isIconUp = false;
    } else {
      iconTag.classList.remove("fa-arrow-down");
      iconTag.classList.add("fa-arrow-up");
      isIconUp = true;
    }

    blockSelect.classList.toggle("hidden");
  });

  inputSearch.addEventListener("keyup", ({ target }) => {
    const { value } = target;
    ulTagDOM(tagName, recipesArray, value);
  });

  // Ul
  ulTagDOM(tagName, recipesArray, "");
};
tagDOM("ingredients", recipes);
tagDOM("appliance", recipes);
tagDOM("ustensils", recipes);

recipesFilter({ isStart: true });
