const itemPage = document.querySelector("#product-page-presentation .itemPage");
const itemPageContainer = document.querySelector(".itemPage__container");
const itemPageCustomize = document.querySelector(".itemPage__customize");
const itemPageAddedToCart = document.querySelector(".itemPage__addedToCart");
const varnishOption = document.querySelector(
  ".itemPage__customize__options__varnish"
);
const colorsOption = document.querySelector(
  ".itemPage__customize__options__colors"
);
const lensesOption = document.querySelector(
  ".itemPage__customize__options__lenses"
);

const itemFoundById = JSON.parse(localStorage.getItem("itemFoundById"));
const tempItem = JSON.parse(localStorage.getItem("tempItem"));
var cartItemsA = {};
cartItemsA = JSON.parse(localStorage.getItem("cartItemsA"));
//console.log(cartItemsA);
//const cartItemsA = new Object();
//localStorage.setItem("cartItemsA", JSON.stringify(cartItemsA));

/*********************************************** */
/***********ACCESSORY FUCTIONS************** */
/********************************************* */

function sizeOfArrayA(arr) {
  var size = 0;
  for (var key in arr) {
    size++;
  }
  return size;
}

let productColorMap = new Map([
  ["Pale brown", "$paleBrown"],
  ["Dark brown", "$darkBrown"],
  ["White", "$darkBrown"],
  ["Brown", "brown"],
  ["Blue", "blue"],
  ["Pink", "pink"],
  ["Beige", "$BeigeColor"],
  ["Tan", "tanColor"],
  ["Chocolate", "chocolateColor"],
]);

let productVarnishMap = new Map([
  ["Dark Oak", "../img/dark_oak.PNG"],
  ["Light Oak", "../img/light_oak.PNG"],
  ["Teak", "../img/teak.PNG"],
  ["Mahogany", "../img/mahogany.PNG"],
  ["Chocolate", "../img/chocolate.PNG"],
  ["Tan", "../img/tan.PNG"],
  ["Black", "../img/black.PNG"],
  ["White", "../img/white.PNG"],
]);

/************************************************** */
/*************DISPLAY FUNCTIONS******************* */
/************************************************ */

async function displayAvailableVarnish(child) {
  colorsOption.textContent = "";
  varnishOption.textContent = "";
  lensesOption.textContent = "";
  //Create and update the title
  const varnishTitle = document.createElement("h3");
  varnishTitle.textContent = "Varnish";
  varnishTitle.classList.add("itemPage__customize__options__varnish--title");
  // append the title to the colors option
  varnishOption.appendChild(varnishTitle);
  // pick up all the colors pf the the current element and display them
  for (let i = 0; i < child.varnish.length; i++) {
    const p = document.createElement("p");
    p.textContent = child.varnish[i];
    const img = document.createElement("img");
    img.src = productVarnishMap.get(child.varnish[i]);
    img.classList.add("itemPage__customize__options__varnish--element-img");
    img.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const imgElements = document.getElementsByClassName(
        "itemPage__customize__options__varnish--element-img-active"
      );
      for (let i = 0; i < imgElements.length; i++) {
        imgElements[i].classList.remove(
          "itemPage__customize__options__varnish--element-img-active"
        );
      }
      this.classList.add(
        "itemPage__customize__options__varnish--element-img-active"
      );
    });
    //Create the element div
    const varnishElt = document.createElement("div");
    varnishElt.classList.add("itemPage__customize__options__varnish--element");
    varnishElt.appendChild(img);
    varnishElt.appendChild(p);
    varnishOption.appendChild(varnishElt);
  }
}

async function displayAvailableColors(child) {
  colorsOption.textContent = "";
  varnishOption.textContent = "";
  lensesOption.textContent = "";
  //Create and update the title
  const colorsTitle = document.createElement("h3");
  colorsTitle.textContent = "Colors";
  colorsTitle.classList.add("itemPage__customize__options__colors--title");
  // append the title to the colors option
  colorsOption.appendChild(colorsTitle);
  // pick up all the colors pf the the current element and display them
  for (let i = 0; i < child.colors.length; i++) {
    const p = document.createElement("p");
    p.textContent = child.colors[i];
    const div = document.createElement("div");
    div.classList.add("itemPage__customize__options__colors--element-div");
    div.style.backgroundColor = productColorMap.get(child.colors[i]);
    div.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const divElements = document.getElementsByClassName(
        "itemPage__customize__options__colors--element-div-active"
      );
      for (let i = 0; i < divElements.length; i++) {
        divElements[i].classList.remove(
          "itemPage__customize__options__colors--element-div-active"
        );
      }
      this.classList.add(
        "itemPage__customize__options__colors--element-div-active"
      );
    });
    //Create the element div
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("itemPage__customize__options__colors--element");
    parentDiv.appendChild(div);
    parentDiv.appendChild(p);
    colorsOption.appendChild(parentDiv);
  }
}

async function displayAvailableLenses(child) {
  colorsOption.textContent = "";
  varnishOption.textContent = "";
  lensesOption.textContent = "";
  //Create and update the title
  const lensesTitle = document.createElement("h3");
  lensesTitle.textContent = "Lenses";
  lensesTitle.classList.add("itemPage__customize__options__lenses--title");
  // append the title to the lenses option
  lensesOption.appendChild(lensesTitle);
  // pick up all the colors pf the the current element and display them
  for (let i = 0; i < child.lenses.length; i++) {
    const div = document.createElement("div");
    div.textContent = child.lenses[i];
    div.classList.add("itemPage__customize__options__lenses--element");
    lensesOption.appendChild(div);
    div.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const lenseElements = document.getElementsByClassName(
        "itemPage__customize__options__lenses--active"
      );
      for (let i = 0; i < lenseElements.length; i++) {
        lenseElements[i].classList.remove(
          "itemPage__customize__options__lenses--active"
        );
      }
      this.classList.add("itemPage__customize__options__lenses--active");
    });
  }
}

async function updateProductInfos(child) {
  document.getElementById("itemName0").textContent = child.name;
  document.getElementById("itemDescription0").textContent = child.description;
  document.getElementById("itemPrice0").textContent =
    child.price / 100 + "." + "00" + " €";
  document
    .getElementById("addToCartFinal")
    .addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      addToCartFinalHandler(0);
    });
}

async function displayProductPage(child, parent) {
  itemPageCustomize.style.visibility = "visible";
  const imgTag = document.createElement("img");
  imgTag.src = child.imageUrl;
  imgTag.alt = "d";
  parent.appendChild(imgTag);
  const div = document.createElement("div");
  div.classList.add("itemPage__container__description");
  const title = document.createElement("h2");
  title.textContent = "DETAILS";
  div.appendChild(title);
  //adding description
  const itemDescription = document.createElement("p");
  itemDescription.textContent = child.description;
  div.appendChild(itemDescription);
  parent.appendChild(div);
  updateProductInfos(child);
  if (child.colors) {
    displayAvailableColors(child);
  } else if (child.varnish) {
    displayAvailableVarnish(child);
  } else if (child.lenses) {
    displayAvailableLenses(child);
  } else {
    console.log("Non customisation is possible!!!");
  }
}

// handler functions for filter mouse click events
var ciA = JSON.parse(localStorage.getItem("ciA"));

//console.log(ciA);
async function addToCartFinalHandler(e) {
  if (e !== 0) {
    e.stopPropagation();
    e.preventDefault();
  }
  const str = String(`c${ciA}`);
  cartItemsA = JSON.parse(localStorage.getItem("cartItemsA"));

  cartItemsA[str] = {
    value: itemFoundById,
    id: tempItem.id,
    api: tempItem.api,
  };

  localStorage.setItem("cartItemsA", JSON.stringify(cartItemsA));

  ciA++;
  localStorage.setItem("ciA", JSON.stringify(ciA));

  window.location.href = "../added-to-cart/added-to-cart.html";

  /*
	console.log(sizeOfArrayA(cartItemsA));
	console.log(cartItemsA);
	console.log(JSON.parse(localStorage.getItem("cartItemsA")));
	console.log(JSON.parse(localStorage.getItem("itemFoundById")));
	*/
}

async function teddyFilterHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  localStorage.setItem("filter", "teddies");
  window.location.href = "../index.html";
}

async function cameraFilterHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  localStorage.setItem("filter", "cameras");
  window.location.href = "../index.html";
}
async function woodTableFilterHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  localStorage.setItem("filter", "wood");
  window.location.href = "../index.html";
}
async function allItemsFilterHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  localStorage.setItem("filter", "none");
  window.location.href = "../index.html";
}

/***********************************************************************/
/*******************EVENTS TO HANDLERS ASSOCIATION FUNCTION ***********/
/*********************************************************************/

// Filter mouse events handilng
async function filterEvents() {
  const teddyFilter = document.getElementById("teddyFilter");
  teddyFilter.addEventListener("click", teddyFilterHandler);
  const cameraFilter = document.getElementById("cameraFilter");
  cameraFilter.addEventListener("click", cameraFilterHandler);
  const woodTableFilter = document.getElementById("woodTableFilter");
  woodTableFilter.addEventListener("click", woodTableFilterHandler);
  const allItemsFilter = document.getElementById("allItemsFilter");
  allItemsFilter.addEventListener("click", allItemsFilterHandler);
  displayProductPage(itemFoundById, itemPageContainer);
}

/****************************************************************/
/****************PROGRAM INSTRUCTIONS***************************/
/**************************************************************/

// CALL THE FUNCTIONS IN HERE

filterEvents();
