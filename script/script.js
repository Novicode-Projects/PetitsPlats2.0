const resultCardsDOM = (recipesArray) => {
  result.textContent = "";

  recipesArray.map((recipe) => {
    newRecipeCard(recipe);
  });
};

const recipesFilter = () => {
  const arrayFilter = {
    search: "",
    ingredient: "",
    appliance: "",
    utensils: "",
  };

  const newRecipesArray = [];

  recipes.map((recipe) => {
    const arrayFilterCompare = {
      search: "",
      ingredient: "",
      appliance: "",
      utensils: "",
    };

    const { ingredients, appliance, utensils } = recipe;

    ingredients.map((ingredient) => {
      console.log(ingredient);
    });

    if (appliance != "") {
    }

    utensils.map((utensil) => {});
  });

  resultCardsDOM(newRecipesArray);
};

const tagDOM = (tagName) => {
  // Parent Tag
  const parentTag = document.querySelector(`.${tagName}`);
  const parentTagIcon = document.querySelector(`.${tagName} i`);
  const blockSelectActif = document.querySelector(`.${tagName} .blockSelect`);
  let isIconUp = true;

  parentTag.addEventListener("click", () => {
    if (isIconUp) {
      parentTagIcon.classList.remove("fa-arrow-up");
      parentTagIcon.classList.add("fa-arrow-down");
      isIconUp = false;
    } else {
      parentTagIcon.classList.remove("fa-arrow-down");
      parentTagIcon.classList.add("fa-arrow-up");
      isIconUp = true;
    }

    blockSelectActif.classList.toggle("hidden");
  });

  // Ul

  const ul = document.querySelector(`.${tagName} ul`);
  const arrayWithoutDuplicates = [];

  recipes.map((recipe) => {
    // TagName  = Ingredients
    if (tagName == "ingredients") {
      const { ingredients } = recipe;

      ingredients.map((ingredient) => {
        const isIngredientDuplicates =
          arrayWithoutDuplicates.includes(ingredient);

        if (!isIngredientDuplicates) {
          const li = document.createElement("li");
          li.textContent = ingredient.ingredient;
          ul.appendChild(li);

          arrayWithoutDuplicates.push(ingredient);
        }
      });
    }

    // TagName  = Appliance
    else if (tagName == "appliance") {
      const { appliance } = recipe;

      const isApplianceDuplicates = arrayWithoutDuplicates.includes(appliance);

      if (!isApplianceDuplicates) {
        const li = document.createElement("li");
        li.textContent = appliance;
        ul.appendChild(li);

        arrayWithoutDuplicates.push(appliance);
      }
    }

    // TagName = Ustensils
    else if (tagName == "ustensils") {
      const { ustensils } = recipe;

      ustensils.map((ustensil) => {
        const isUstensilDuplicates = arrayWithoutDuplicates.includes(ustensil);

        if (!isUstensilDuplicates) {
          const li = document.createElement("li");
          li.textContent = ustensil;
          ul.appendChild(li);

          arrayWithoutDuplicates.push(ustensil);
        }
      });
    }
  });
};

tagDOM("ingredients");
tagDOM("appliance");
tagDOM("ustensils");

resultCardsDOM(recipes);
