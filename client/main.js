let teddiesApi = "https://www.orinoco.ranmamou.com/api/teddies";
let camerasApi = "https://www.orinoco.ranmamou.com/api/cameras";
let woodTablesApi = "https://www.orinoco.ranmamou.com/api/furniture";

//let teddiesApi = "http://localhost:8007/api/teddies";
//let camerasApi = "http://localhost:8007/api/cameras";
//let woodTablesApi = "http://localhost:8007/api/furniture";

let elt = document.querySelector("#home-page-presentation .products");

var allItemsArray = [];

const NorbertId = "5be9c8541c9d440000665243";
const CrossTableId = "5be9cc611c9d440000c1421e";
const zurss50sId = "5be1ed3f1c9d44000030b061";

var itemFoundById = new Object();
if (!localStorage.getItem("itemFoundById")) {
  localStorage.setItem("itemFoundById", JSON.stringify(itemFoundById));
} else {
  itemFoundById = JSON.parse(localStorage.getItem("itemFoundById"));
}

var cartItemsA = {};
if (!localStorage.getItem("cartItemsA")) {
  localStorage.setItem("cartItemsA", JSON.stringify(cartItemsA));
} else {
  cartItemsA = JSON.parse(localStorage.getItem("cartItemsA"));
}

var tempItem = {
  id: "",
  api: "",
};
if (!localStorage.getItem("tempItem")) {
  localStorage.setItem("tempItem", JSON.stringify(tempItem));
} else {
  tempItem = JSON.parse(localStorage.getItem("tempItem"));
}

var ciA = 0;
if (!localStorage.getItem("ciA")) {
  localStorage.setItem("ciA", JSON.stringify(ciA));
} else {
  ciA = JSON.parse(localStorage.getItem("ciA"));
}

/*********************************************** */
/***********DATA REQUEST FUCTIONS************** */
/********************************************* */

async function getRequest(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (v) {
        resolve(v);
      })
      .catch(function (err) {
        reject(new Error("fetching data from Api" + url + " is failed"));
      });
  });
}

async function getRequestById(url, id) {
  var urlId = url + "/" + id;
  return new Promise((resolve, reject) => {
    fetch(urlId)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (v) {
        resolve(v);
      })
      .catch(function (err) {
        reject(new Error("fetching data from Api" + apiUrl + " is failed"));
      });
  });
}

async function getFromApi(apiUrl, containerArray) {
  try {
    for (var i of await getRequest(apiUrl)) {
      containerArray.push(i);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getItemById(apiUrl, itemId) {
  try {
    itemFoundById = await getRequestById(apiUrl, itemId);
    localStorage.setItem("itemFoundById", JSON.stringify(itemFoundById));
  } catch (error) {
    console.log(error);
  }
}

async function loadAll(...apis) {
  allItemsArray.length = 0;
  elt.textContent = "";

  for (var i = 0; i < apis.length; i++) {
    await getFromApi(apis[i], allItemsArray);
  }
  for (let i = 0; i < allItemsArray.length; i++) {
    displayTopic(allItemsArray[i], elt, i);
  }
}

async function loadFilterApi(filterApi, containerArray) {
  containerArray.length = 0;
  await getFromApi(filterApi, containerArray);
  for (let i = 0; i < containerArray.length; i++) {
    displayTopic(containerArray[i], elt, i);
  }
}

/************************************************** */
/*************DISPLAY FUNCTIONS******************* */
/************************************************ */

async function displayTopic(child, parent, childId) {
  const newElt = document.createElement("a");
  newElt.href = "index.html";
  newElt.classList.add("products__topic");
  newElt.id = "i" + childId;

  const imgTag = document.createElement("img");
  imgTag.src = child.imageUrl;
  imgTag.alt = "description";
  newElt.appendChild(imgTag);
  // Adding name
  const itemName = document.createElement("h2");
  itemName.textContent = child.name;
  newElt.appendChild(itemName);

  //adding description
  const itemDescription = document.createElement("h3");
  itemDescription.textContent = child.description;
  newElt.appendChild(itemDescription);

  //Ading rating stars
  const ratingDiv = document.createElement("div");
  for (let i = 0; i < 5; i++) {
    var iStar = document.createElement("i");
    iStar.classList.add("fa-solid");
    iStar.classList.add("fa-star");
    ratingDiv.appendChild(iStar);
  }
  const rSpan = document.createElement("span");
  ratingDiv.appendChild(rSpan);
  newElt.appendChild(ratingDiv);
  //adding price
  const itemPrice = document.createElement("h4");
  itemPrice.textContent = child.price / 100 + "." + "00" + " €";
  newElt.appendChild(itemPrice);
  //adding button
  let itemButton = document.createElement("button");
  itemButton.textContent = "Add to card";
  itemButton.id = "btn";

  newElt.appendChild(itemButton);
  parent.appendChild(newElt);
  newElt.addEventListener("click", goProductPageHandler);
}

/****************************************** */
/************HANDLER FUNCTIONS************* */
/****************************************** */

async function saveItem(id) {
  // update temp Api
  if (allItemsArray[id].hasOwnProperty("colors")) {
    tempItem.api = teddiesApi;
  } else if (allItemsArray[id].hasOwnProperty("varnish")) {
    tempItem.api = woodTablesApi;
  } else {
    tempItem.api = camerasApi;
  }
  // update tempId
  tempItem.id = allItemsArray[id]._id;
  localStorage.setItem("tempItem", JSON.stringify(tempItem));
  console.log(localStorage);
}

async function goProductPageHandler(e) {
  e.preventDefault();
  e.stopPropagation();

  let id = e.target.parentElement.id;
  id = parseInt(id.substr(1, id.length - 1));
  const api = "";
  saveItem(id);
  await getItemById(tempItem.api, tempItem.id);

  if (e.target.id == "btn") {
    const str = String(`c${ciA}`);

    cartItemsA[str] = {
      value: itemFoundById,
      id: tempItem.id,
      api: tempItem.api,
    };
    localStorage.setItem("cartItemsA", JSON.stringify(cartItemsA));
    ciA++;
    localStorage.setItem("ciA", JSON.stringify(ciA));
    window.location.href = "./added-to-cart/added-to-cart.html";
  } else {
    window.location.href = "./product-page/product-page.html";
    //displayProductPage(itemFoundById, itemPageContainer);
    //document.getElementById('addToCartFinal').addEventListener('click', addToCartFinalHandler);
  }
}

async function teddyFilterHandler(e) {
  if (e !== 0) {
    e.preventDefault();
    e.stopPropagation();
  }
  elt.textContent = "";
  loadFilterApi(teddiesApi, allItemsArray);
}

async function cameraFilterHandler(e) {
  if (e !== 0) {
    e.preventDefault();
    e.stopPropagation();
  }
  elt.textContent = "";
  loadFilterApi(camerasApi, allItemsArray);
}
async function woodTableFilterHandler(e) {
  if (e !== 0) {
    e.preventDefault();
    e.stopPropagation();
  }
  elt.textContent = "";
  loadFilterApi(woodTablesApi, allItemsArray);
}

async function allItemsFilterHandler(e) {
  if (e !== 0) {
    e.preventDefault();
    e.stopPropagation();
  }
  elt.textContent = "";
  loadAll(teddiesApi, woodTablesApi, camerasApi);
}

/***********************************************************************/
/*******************EVENTS TO HANDLERS ASSOCIATION FUNCTION ***********/
/*********************************************************************/

async function loadHomePage(filter) {
  if (!filter || filter === "none") {
    allItemsFilterHandler(0);
  }
  if (filter === "teddies") {
    teddyFilterHandler(0);
  }
  if (filter === "cameras") {
    cameraFilterHandler(0);
  }
  if (filter === "wood") {
    woodTableFilterHandler(0);
  }

  localStorage.setItem("filter", "none");
}

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

  let lastPage = localStorage.getItem("lastPage");
  let filter = localStorage.getItem("filter");

  loadHomePage(filter);
}

/****************************************************************/
/****************PROGRAM INSTRUCTIONS***************************/
/**************************************************************/

// CALL THE FUNCTIONS IN HERE

filterEvents();
