
const cartElt = document.querySelector('.cart__container');
const cartPrice = document.querySelector('.cart__price');
const cartValidation = document.querySelector('.cart__validation');
const cartOrderConfirmation = document.querySelector('.cart__orderConfirmation');

var allItemsPrice = 0;
var shipingPrice = 0;
var totalPrice = 0;
var ItemPrice = 0;

var cartItemsA = {};
cartItemsA = JSON.parse(localStorage.getItem("cartItemsA"));
console.log(JSON.parse(localStorage.getItem("cartItemsA")));


/*************************************************/
/***************ACCESSORY FUNCTIONS******************/
/***********************************************/

// Function to find the length of an associative array
function sizeOfArrayA(arr) {
	var size = 0;
  for (var key in arr) {
		size++;
	}
  return size;
}

/************************************************** */
/*************DISPLAY FUNCTIONS******************* */
/************************************************ */

async function displayTopicInCart(child, parent, key){
	const newElt = document.createElement('div');
	newElt.classList.add("cart__container__topic");
	newElt.id = key;
  const imgTag = document.createElement('img');
  imgTag.src = child.imageUrl;
	imgTag.alt = "d";
  newElt.appendChild(imgTag);
  const infosDiv = document.createElement('div');
	infosDiv.classList.add('cart__container__topic__infos');
	const itemName = document.createElement('h2');
  itemName.textContent = child.name;
  infosDiv.appendChild(itemName);
  //adding description
	const itemDescription = document.createElement('p');
  itemDescription.textContent = child.description;
	itemDescription.classList.add('cart__container__topic__infos__description');
  infosDiv.appendChild(itemDescription);
	const quantityAdjust = document.createElement('div');
	const btnL = document.createElement('button');
	btnL.textContent = "-";
	btnL.classList.add('btn-left');
	quantityAdjust.appendChild(btnL);
	const  itemQuantity= document.createElement('p');
	itemQuantity.textContent = "2";
	itemQuantity.classList.add('topics-number');
	quantityAdjust.appendChild(itemQuantity);
	const btnR = document.createElement('button');
	btnR.textContent = "+";
	btnR.classList.add('btn-right');
	quantityAdjust.appendChild(btnR);
	infosDiv.appendChild(quantityAdjust);
	newElt.appendChild(infosDiv);
	const topicOptions = document.createElement('div');
	topicOptions.classList.add('cart__container__topic__options');
	const deleteElt = document.createElement('a');
	deleteElt.href = "index.html";
	deleteElt.id = "Fuck From here a";
	const deleteIcon = document.createElement('i');
	deleteIcon.classList.add('fa-solid');
	deleteIcon.classList.add('fa-trash-can');
	deleteIcon.id = key;
	deleteElt.appendChild(deleteIcon);
	deleteIcon.addEventListener('click', handlerOfRemoveFromCart);
	topicOptions.appendChild(deleteElt);
	const objPrice = document.createElement('h3');
	objPrice.textContent = (child.price/100)+'.'+'00' +' €';
	topicOptions.appendChild(objPrice);
	newElt.appendChild(topicOptions);
	parent.appendChild(newElt);
}


// handler functions for filter mouse click events

async function handlerOfRemoveFromCart(e){
	e.stopPropagation();
	e.preventDefault();
	cartItemsA = JSON.parse(localStorage.getItem("cartItemsA"));
	let parent = e.target.parentElement;
	for(let i = 0; i<2; i++){
		parent = parent.parentElement;
	}	
	delete cartItemsA[parent.id];
	localStorage.setItem("cartItemsA", JSON.stringify(cartItemsA));
	cartClickHandler(0);
}


async function loadCartElements(){
	for(var key in cartItemsA){
		displayTopicInCart(cartItemsA[key].value, cartElt, key);
		allItemsPrice+= (cartItemsA[key].value.price)/100;
		(allItemsPrice > 200) ? shipingPrice = 0 : shipingPrice = 15;
		totalPrice = allItemsPrice + shipingPrice;
		updateCartPricing();
	}
}

async function updateCartPricing(){
	document.getElementById('shipingPrice').textContent = shipingPrice +'.'+'00' +' €';
		document.getElementById('allItemsPrice').textContent = allItemsPrice +'.'+'00' +' €';
		document.getElementById('allItemsNumber').textContent = sizeOfArrayA(cartItemsA)+' Produits '+ '+'+ ' 0 '+' cadeaux';
		document.getElementById('totalPrice').textContent = totalPrice +'.'+'00' +' €';
		document.getElementById('totalPriceMath').textContent =
		'('+allItemsPrice+'.'+'00' +' € '+shipingPrice +'.'+'00' +' €'+" frais d'envoi"+')';
}

async function updateCartInfos(cartState){
	if(cartState === "empty"){
		const h2 = document.createElement('h2');
		h2.textContent = "Votre panier est vide, veuillez ajouter des articles.";
		h2.classList.add('h2');
		cartElt.appendChild(h2);
		cartPrice.style.visibility = 'hidden';
		shipingPrice = 0;
		updateCartPricing();
	}else{
		const h2 = document.createElement('h2');
		h2.textContent = "Votre panier comporte : " +sizeOfArrayA(cartItemsA)+' articles'
		h2.classList.add('h2');
		cartElt.appendChild(h2);
		document.getElementById('cartValidation').addEventListener('click', (e)=>{
			e.preventDefault();
			e.stopPropagation();
			window.location.href = "../cart-form/cart-form.html";
		});
	}
}

async function cartClickHandler(e){
	if (e != 0){
		e.stopPropagation();
		e.preventDefault();
	}
	totalPrice = 0;
	allItemsPrice = 0;
	cartElt.textContent= '';
	//const h2 = document.createElement('h2');
	if( sizeOfArrayA(cartItemsA) == 0){
		await updateCartInfos("empty");
		loadCartElements();
	}
	else{
		await updateCartInfos("notEmpty");
		loadCartElements();
		//document.getElementById('cartValidation').addEventListener('click', handlerCartValidation);
	}
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
	cartClickHandler(0);
	document.getElementById('teddyFilter').addEventListener('click', teddyFilterHandler);
	document.getElementById('cameraFilter').addEventListener('click', cameraFilterHandler);
	document.getElementById('woodTableFilter').addEventListener('click', woodTableFilterHandler);
	document.getElementById('allItemsFilter').addEventListener('click', allItemsFilterHandler);
}

/****************************************************************/
/****************PROGRAM INSTRUCTIONS***************************/
/**************************************************************/

// CALL THE FUNCTIONS IN HERE

filterEvents();










  
  