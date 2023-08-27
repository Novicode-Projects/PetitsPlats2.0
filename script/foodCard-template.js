const textFormat = (string, targetNumber) => {
  const { length } = string;

  if (length > targetNumber) {
    const subtractNumber = length - targetNumber;
    return (string = string.slice(0, -subtractNumber) + "...");
  }

  return string;
};

const newRecipeCard = (props) => {
  const { image, name, description, ingredients } = props;

  // Article
  const article = document.createElement("article");
  article.classList.add("foodCard");

  // Header
  const divCardHeader = document.createElement("div");
  const img = document.createElement("img");
  img.setAttribute("src", `./images/recettes/${image}`);
  img.setAttribute("alt", name);
  divCardHeader.appendChild(img);

  // Body
  const divCardBody = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = name;

  const subDivCardBody = document.createElement("div");
  const h3CardBody = document.createElement("h3");
  h3CardBody.textContent = "recette";

  const pCardBody = document.createElement("p");
  pCardBody.textContent = textFormat(description, 200);

  subDivCardBody.append(h3CardBody, pCardBody);
  divCardBody.append(h2, subDivCardBody);

  // Footer
  const divCardFooter = document.createElement("div");
  const h3CardFooter = document.createElement("h3");
  h3CardFooter.textContent = "Ingrédients";

  const ul = document.createElement("ul");

  ingredients.map(({ ingredient, quantity, unit }) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    const span = document.createElement("span");
    span.textContent = unit != undefined ? `${quantity} ${unit}` : quantity;

    li.appendChild(span);
    ul.appendChild(li);
  });

  divCardFooter.append(h3CardFooter, ul);

  article.append(divCardHeader, divCardBody, divCardFooter);

  result.appendChild(article);
};
