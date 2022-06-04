



// handler functions for filter mouse click events
async function handlerOfSeeCart(e){
	e.preventDefault();
	e.stopPropagation();
	window.location.href = "../cart/cart.html";
}
async function handlerOfContinueShopping(e){
	e.preventDefault();
	e.stopPropagation();
	window.location.href = "../index.html";
}
async function handlerOfGoAhead(e){
	e.preventDefault();
	e.stopPropagation();
	window.location.href = "../product-page/product-page.html";
}

async function updatePageInfos(){
	itemFoundById = JSON.parse(localStorage.getItem("itemFoundById"));
	document.getElementById('itemPrice').textContent = parseFloat(itemFoundById.price/100)+'.'+'00' +' €';
	document.getElementById('itemName').textContent = itemFoundById.name;
	document.getElementById('itemImage').src = itemFoundById.imageUrl;
} 


async function handlerCartValidationExit(e){
	e.preventDefault();
	e.stopPropagation();
	cartValidation.style.visibility = 'hidden';
}

async function teddyFilterHandler(e){
	e.preventDefault();
	e.stopPropagation();
	localStorage.setItem("filter", "teddies");
	window.location.href = "../index.html";
}

async function cameraFilterHandler(e){
	e.preventDefault();
	e.stopPropagation();
	localStorage.setItem("filter", "cameras");
	window.location.href = "../index.html";
	
}
async function woodTableFilterHandler(e){
	e.preventDefault();
	e.stopPropagation();
	localStorage.setItem("filter", "wood");
	window.location.href = "../index.html";
}
async function allItemsFilterHandler(e){
	e.preventDefault();
	e.stopPropagation();
	localStorage.setItem("filter", "none");
	window.location.href = "../index.html";
}

/***********************************************************************/
/*******************EVENTS TO HANDLERS ASSOCIATION FUNCTION ***********/
/*********************************************************************/

// Filter mouse events handilng
async function filterEvents(){
	document.getElementById('teddyFilter').addEventListener('click', teddyFilterHandler);
  document.getElementById('cameraFilter').addEventListener('click', cameraFilterHandler);
  document.getElementById('woodTableFilter').addEventListener('click', woodTableFilterHandler);
  document.getElementById('allItemsFilter').addEventListener('click', allItemsFilterHandler);
	document.getElementById('seeCart').addEventListener('click', handlerOfSeeCart);
	document.getElementById('continueShopping').addEventListener('click', handlerOfContinueShopping );
	document.getElementById('goAhead').addEventListener('click', handlerOfGoAhead);
	updatePageInfos();
}
/****************************************************************/
/****************PROGRAM INSTRUCTIONS***************************/
/**************************************************************/

// CALL THE FUNCTIONS IN HERE

filterEvents();










  
  