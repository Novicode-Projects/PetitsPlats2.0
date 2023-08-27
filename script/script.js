// Search Button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  GlobalFilter.search = searchBar.value;
  recipesFilter();
});

// Result Cards DOM
const resultCardsDOM = (recipesArray) => {
  result.textContent = "";

  recipesArray.map((recipe) => {
    newRecipeCard(recipe);
  });
};

// Filter
const recipesFilter = () => {
  const newRecipesArray = [];

  // GobalFilter
  const arrayFilter = {
    search: GlobalFilter.search != "" ? true : false,
    ingredient: GlobalFilter.ingredient != "" ? true : false,
    appliance: GlobalFilter.appliance != "" ? true : false,
    ustensils: GlobalFilter.ustensils != "" ? true : false,
  };

  recipes.map((recipe) => {
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

      const ingredientsBooleanArray = ingredients.map((ingredient) => {
        const lowerIngredient = ingredient.ingredient.toLowerCase();

        return lowerIngredient.includes(lowerGlobalFilterSearch);
      });

      if (
        lowerName.includes(lowerGlobalFilterSearch) ||
        ingredientsBooleanArray.find((ingredient) => ingredient === true) ||
        lowerDescription.includes(lowerGlobalFilterSearch)
      ) {
        arrayFilterCompare.search = true;
      }
    }

    // Ingredient
    if (GlobalFilter.ingredient != "") {
      const { ingredients } = recipe;
      const lowerGlobalFilterIngredient = GlobalFilter.ingredient;

      ingredients.map((ingredient) => {
        const lowerIngredient = ingredient.ingredient.toLowerCase();

        if (lowerIngredient.includes(lowerGlobalFilterIngredient)) {
          arrayFilterCompare.ingredient = true;
        }
      });
    }

    // Appliance
    if (GlobalFilter.appliance != "") {
      const { appliance } = recipe;

      const lowerAppliance = appliance.toLowerCase();
      const lowerGlobalFilterAppliance = GlobalFilter.appliance;

      if (lowerAppliance.includes(lowerGlobalFilterAppliance)) {
        arrayFilterCompare.appliance = true;
      }
    }

    // Ustensils
    if (GlobalFilter.ustensils != "") {
      const { ustensils } = recipe;
      const lowerGlobalFilterUstensils = GlobalFilter.ustensils;

      ustensils.map((ustensil) => {
        const lowerUstensil = ustensil.toLowerCase();

        if (lowerUstensil.includes(lowerGlobalFilterUstensils)) {
          arrayFilterCompare.ustensils = true;
        }
      });
    }

    if (
      Object.entries(arrayFilter).toString() ===
      Object.entries(arrayFilterCompare).toString()
    ) {
      newRecipesArray.push(recipe);
    }
  });

  const recipsCount = document.querySelector(".recipsCount p");
  recipsCount.textContent = `${newRecipesArray.length} Recettes`;

  resetTagDOMFilter();
  console.log(newRecipesArray);
  resultCardsDOM(newRecipesArray);
};

const actifTag = (tagName, textContent) => {
  const actif = document.querySelector(`.${tagName} .actif`);
  const actifP = document.querySelector(`.${tagName} .actif p`);
  const blockActif = document.querySelector(`.${tagName} .block-actif`);
  const blockActifP = document.querySelector(`.${tagName} .block-actif p`);
  const blockActifI = document.querySelector(`.${tagName} .block-actif i`);

  //blockActif.textContent = textContent;
  /*const e = ([tagName] = {
    content: textContent,
  });*/

  GlobalFilter.tagsArray.push({ [tagName]: textContent });

  console.log(actifP);
  actifP.textContent = textContent;
  blockActifP.textContent = textContent;

  actif.classList.remove("hidden");
  blockActif.classList.remove("hidden");

  blockActifI.addEventListener("click", () => {
    closeActifButton(tagName);
  });

  recipesFilter();
};

const closeActifButton = (tagName) => {
  const actif = document.querySelector(`.${tagName} .actif`);
  const blockActif = document.querySelector(`.${tagName} .block-actif`);

  if (tagName == "ingredients") {
    GlobalFilter.ingredient = "";
  } else if (tagName == "appliance") {
    GlobalFilter.appliance = "";
  } else if (tagName == "ustensils") {
    GlobalFilter.ustensils = "";
  }

  actif.classList.add("hidden");
  blockActif.classList.add("hidden");

  recipesFilter();
};

// Ul Tag
const ulTagDOM = (tagName, recipeArray, searchValue) => {
  const ul = document.querySelector(`.${tagName} ul`);
  ul.textContent = "";

  const arrayWithoutDuplicates = [];

  // With Search
  if (searchValue != "") {
    recipeArray.map((recipe) => {
      // TagName  = Ingredients

      if (tagName == "ingredients") {
        const { ingredients } = recipe;

        ingredients.map((ingredient) => {
          const isIngredientDuplicates = arrayWithoutDuplicates.includes(
            ingredient.ingredient,
          );

          if (
            !isIngredientDuplicates &&
            ingredient.ingredient.includes(searchValue)
          ) {
            const li = document.createElement("li");
            li.textContent = ingredient.ingredient;

            li.addEventListener("click", ({ target }) => {
              const { textContent } = target;
              GlobalFilter.ingredient = textContent;
              actifTag(tagName, textContent);
              recipesFilter();
            });

            ul.appendChild(li);

            arrayWithoutDuplicates.push(ingredient.ingredient);
          }
        });
      }

      // TagName  = Appliance
      else if (tagName == "appliance") {
        const { appliance } = recipe;

        const isApplianceDuplicates =
          arrayWithoutDuplicates.includes(appliance);

        if (!isApplianceDuplicates && appliance.includes(searchValue)) {
          const li = document.createElement("li");
          li.textContent = appliance;

          li.addEventListener("click", ({ target }) => {
            const { textContent } = target;
            GlobalFilter.appliance = textContent;
            actifTag(tagName, textContent);
            recipesFilter();
          });

          ul.appendChild(li);

          arrayWithoutDuplicates.push(appliance);
        }
      }

      // TagName = Ustensils
      else if (tagName == "ustensils") {
        const { ustensils } = recipe;

        ustensils.map((ustensil) => {
          const isUstensilDuplicates =
            arrayWithoutDuplicates.includes(ustensil);

          if (!isUstensilDuplicates && ustensil.includes(searchValue)) {
            const li = document.createElement("li");
            li.textContent = ustensil;

            li.addEventListener("click", ({ target }) => {
              const { textContent } = target;
              GlobalFilter.ustensils = textContent;
              actifTag(tagName, textContent);
              recipesFilter();
            });

            ul.appendChild(li);

            arrayWithoutDuplicates.push(ustensil);
          }
        });
      }
    });
  }

  // Without Search
  else {
    recipeArray.map((recipe) => {
      // TagName  = Ingredients

      if (tagName == "ingredients") {
        const { ingredients } = recipe;

        ingredients.map((ingredient) => {
          const isIngredientDuplicates = arrayWithoutDuplicates.includes(
            ingredient.ingredient,
          );

          if (!isIngredientDuplicates) {
            const li = document.createElement("li");
            li.textContent = ingredient.ingredient;

            li.addEventListener("click", ({ target }) => {
              const { textContent } = target;
              GlobalFilter.ingredient = textContent;
              actifTag(tagName, textContent);
              recipesFilter();
            });

            ul.appendChild(li);

            arrayWithoutDuplicates.push(ingredient.ingredient);
          }
        });
      }

      // TagName  = Appliance
      else if (tagName == "appliance") {
        const { appliance } = recipe;

        const isApplianceDuplicates =
          arrayWithoutDuplicates.includes(appliance);

        if (!isApplianceDuplicates) {
          const li = document.createElement("li");
          li.textContent = appliance;

          li.addEventListener("click", ({ target }) => {
            const { textContent } = target;
            GlobalFilter.appliance = textContent;
            actifTag(tagName, textContent);
            recipesFilter();
          });

          ul.appendChild(li);

          arrayWithoutDuplicates.push(appliance);
        }
      }

      // TagName = Ustensils
      else if (tagName == "ustensils") {
        const { ustensils } = recipe;

        ustensils.map((ustensil) => {
          const isUstensilDuplicates =
            arrayWithoutDuplicates.includes(ustensil);

          if (!isUstensilDuplicates) {
            const li = document.createElement("li");
            li.textContent = ustensil;

            li.addEventListener("click", ({ target }) => {
              const { textContent } = target;
              GlobalFilter.ustensils = textContent;
              actifTag(tagName, textContent);
              recipesFilter();
            });

            ul.appendChild(li);

            arrayWithoutDuplicates.push(ustensil);
          }
        });
      }
    });
  }
};

// Tag
const tagDOM = (tagName) => {
  // Parent Tag
  const buttonTag = document.querySelector(`.${tagName} button`);
  const iconTag = document.querySelector(`.${tagName} i`);
  const inputSearch = document.querySelector(`.${tagName} input[type=search]`);

  const blockSelect = document.querySelector(`.${tagName} .blockSelect`);

  let isIconUp = true;

  const actifI = document.querySelector(`.${tagName} .actif i`);

  actifI.addEventListener("click", () => closeActifButton(tagName));

  buttonTag.addEventListener("click", () => {
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
    ulTagDOM(tagName, recipes, value);
  });

  // Ul
  ulTagDOM(tagName, recipes, "");
};

const resetTagDOMFilter = () => {
  const { tagsArray } = GlobalFilter;
  console.log(tagsArray);

  tagsArray.map((tag) => {
    console.log(tag);
  });
};

tagDOM("ingredients");
tagDOM("appliance");
tagDOM("ustensils");

recipesFilter();
