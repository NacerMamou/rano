let teddiesApi = "https://www.orinoco.ranmamou.com/api/teddies";
let camerasApi = "https://www.orinoco.ranmamou.com/api/cameras";
let woodTablesApi = "https://www.orinoco.ranmamou.com/api/furniture"; 

// let teddiesApi = "http://localhost:8007/api/teddies";
// let camerasApi = "http://localhost:8007/api/cameras";
// let woodTablesApi = "http://localhost:8007/api/furniture"; 

var cartItemsA = {};
cartItemsA = JSON.parse(localStorage.getItem("cartItemsA"));

var OrderToTeddiesApi = {
	contact : {
		firstName : "MAMOU",
		lastName : "NACER",
		address : "5 Rue de la pomme de terre 77000",
		city : "Melun",
		email : "mamou.nacer@outlook.com"
	},
	products : []
};
var OrderToWoodTablesApi = {
	contact : {
		firstName : "MAMOU",
		lastName : "NACER",
		address : "5 Rue de la pomme de terre 77000",
		city : "Melun",
		email : "mamou.nacer@outlook.com"
	},
	products : []
};
var OrderToCamerasApi = {
	contact : {
		firstName : "MAMOU",
		lastName : "NACER",
		address : "5 Rue de la pomme de terre 77000",
		city : "Melun",
		email : "mamou.nacer@outlook.com"
	},
	products : []
};

var ResponseToOrder = {
	teddies : { orderId : 'none'},
	woodTables : {orderId : 'none'},
	cameras : {orderId : 'none'}
};

if(!localStorage.getItem("ResponseToOrder")){
	localStorage.setItem("ResponseToOrder", JSON.stringify(ResponseToOrder));
}else{
	ResponseToOrder = JSON.parse(localStorage.getItem("ResponseToOrder"));
}


/*********************************************** */
/***********DATA REQUEST FUCTIONS************** */
/********************************************* */

async function postRequest(url, reqObj){
	
	let newUrl = url+"/order";
	return new Promise((resolve, reject) => {
		fetch(newUrl, {
			method : "POST",
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(reqObj)
		})
		.then(function(res){
			if(res.ok){
				return res.json();
			}
		})
		.then(function(v){
			resolve(v);
		})
		.catch(function(err){
			reject(new Error('fetching data from Api'+apiUrl+' is failed'));
		});
    });
}

async function postToApi(apiUrl, reqObj){
    try{
		if(apiUrl == teddiesApi){
			ResponseToOrder.teddies = await postRequest(teddiesApi, reqObj);
			localStorage.setItem("ResponseToOrder", JSON.stringify(ResponseToOrder));
		}
		else if(apiUrl == woodTablesApi){
			ResponseToOrder.woodTables = await postRequest(woodTablesApi, reqObj);
			localStorage.setItem("ResponseToOrder", JSON.stringify(ResponseToOrder));
		}
		else{
			ResponseToOrder.cameras = await postRequest(camerasApi, reqObj);
			localStorage.setItem("ResponseToOrder", JSON.stringify(ResponseToOrder));
		}
	}

    catch(error){
        console.log(error);
    }
}

var formIsValid = true;
async function validateForm(){
	const lname = document.getElementById('lname');
	const fname = document.getElementById('fname');
	const email = document.getElementById('email');
	const addressNumber = document.getElementById('addressNumber');
	const streetName = document.getElementById('streetName');
	const zipCode = document.getElementById('zipCode');
	const town = document.getElementById('town');
	const country = document.getElementById('country');
	const formCheckbox = document.getElementById('formCheckbox');
	formIsValid = true;
	if(lname.value.length == 0){
		formIsValid = false;
		lname.parentElement.classList.add('notValid');
		lname.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.value != 0){
				lname.parentElement.classList.remove('notValid');
				lname.parentElement.classList.add('isValid');
			}
		});
	}else{
		lname.parentElement.classList.remove('notValid');
		lname.parentElement.classList.remove('isValid');
	}
	if(fname.value.length == 0){
		formIsValid = false;
		fname.parentElement.classList.add('notValid');
		fname.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.value != 0){
				fname.parentElement.classList.remove('notValid');
				fname.parentElement.classList.add('isValid');
			}
		});
	}else{
		fname.parentElement.classList.remove('notValid');
		fname.parentElement.classList.remove('isValid');
	}
	
	if(email.value.length == 0 || !isEmail(email.value)){
		formIsValid = false;
		email.parentElement.classList.add('notValid');
		email.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.value != 0){
				email.parentElement.classList.remove('notValid');
				email.parentElement.classList.add('isValid');
			}
		});
	}else{
		email.parentElement.classList.remove('notValid');
		email.parentElement.classList.remove('isValid');
	}

	if(addressNumber.value.length == 0 || isNaN(addressNumber.value) ){
		formIsValid = false;
		addressNumber.parentElement.classList.add('notValid');
		addressNumber.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.value != 0){
				addressNumber.parentElement.classList.remove('notValid');
				addressNumber.parentElement.classList.add('isValid');
			}
		});
	}else{
		addressNumber.parentElement.classList.remove('notValid');
		addressNumber.parentElement.classList.remove('isValid');
	}

	if(streetName.value.length == 0){
		formIsValid = false;
		streetName.parentElement.classList.add('notValid');
		streetName.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.value != 0){
				streetName.parentElement.classList.remove('notValid');
				streetName.parentElement.classList.add('isValid');
			}
		});
	}else{
		streetName.parentElement.classList.remove('notValid');
		streetName.parentElement.classList.remove('isValid');
	}

	if(zipCode.value.length == 0 || isNaN(zipCode.value)){
		formIsValid = false;
		zipCode.parentElement.classList.add('notValid');
		zipCode.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.value != 0){
				zipCode.parentElement.classList.remove('notValid');
				zipCode.parentElement.classList.add('isValid');
			}
		});
	}else{
		zipCode.parentElement.classList.remove('notValid');
		zipCode.parentElement.classList.remove('isValid');
	}

	if(country.value.length == 0){
		formIsValid = false;
		country.parentElement.classList.add('notValid');
		country.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.value != 0){
				country.parentElement.classList.remove('notValid');
				country.parentElement.classList.add('isValid');
			}
		});
	}else{
		country.parentElement.classList.remove('notValid');
		country.parentElement.classList.remove('isValid');
	}

	if(!formCheckbox.checked){
		formIsValid = false;
		
		formCheckbox.parentElement.classList.add('notChecked');
		formCheckbox.addEventListener('input', function(e){
			e.preventDefault();
			e.stopPropagation();
			if(e.target.checked){
				formCheckbox.parentElement.classList.remove('notChecked');
			}
		});
	}

	if(formIsValid){
		OrderToTeddiesApi.contact.firstName = fname.value;
		OrderToTeddiesApi.contact.lastName = lname.value;
		OrderToTeddiesApi.contact.address = addressNumber.value+' '+ streetName.value+' '+zipCode.value;
		OrderToTeddiesApi.contact.city = town.value+' '+country.value;
		OrderToTeddiesApi.contact.email = email.value;

		//console.log(OrderToTeddiesApi.contact);
		
		OrderToWoodTablesApi.contact.firstName = fname.value;
		OrderToWoodTablesApi.contact.lastName = lname.value;
		OrderToWoodTablesApi.contact.address = addressNumber.value+' '+ streetName.value+' '+zipCode.value;
		OrderToWoodTablesApi.contact.city = town.value+' '+country.value;
		OrderToWoodTablesApi.contact.email = email.value;

		OrderToCamerasApi.contact.firstName = fname.value;
		OrderToCamerasApi.contact.lastName = lname.value;
		OrderToCamerasApi.contact.address = addressNumber.value+' '+ streetName.value+' '+zipCode.value;
		OrderToCamerasApi.contact.city = town.value+' '+country.value;
		OrderToCamerasApi.contact.email = email.value;
	}
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

async function handlerCartFinalValidation(e){
	e.stopPropagation();
	e.preventDefault();	
  // Initializing the objects to send
  validateForm();
  
  if(formIsValid){
    OrderToTeddiesApi.products.length = 0;
	  OrderToWoodTablesApi.products.length = 0;
	  OrderToCamerasApi.products.length = 0;
	  for(var key in cartItemsA){
		  if(cartItemsA[key].api == teddiesApi){
		    OrderToTeddiesApi.products.push(cartItemsA[key].id);
		  }
		  else if(cartItemsA[key].api == woodTablesApi ){
			  OrderToWoodTablesApi.products.push(cartItemsA[key].id);
		  }
		  else{
			  OrderToCamerasApi.products.push(cartItemsA[key].id);
		  }
	  }

	  if( OrderToTeddiesApi.products.length > 0){
		  await postToApi(teddiesApi, OrderToTeddiesApi);
	  }
	  if(OrderToWoodTablesApi.products.length > 0){
		  await postToApi(woodTablesApi, OrderToWoodTablesApi);
	  }
	  if(OrderToCamerasApi.products.length > 0){
      await postToApi(camerasApi, OrderToCamerasApi);
	  }
	  for(var key in cartItemsA){
		  delete cartItemsA[key];
	  }
    localStorage.setItem("cartItemsA", JSON.stringify(cartItemsA));
    window.location.href = "../order-confirmation/order-confirmation.html";
	  //console.log(sizeOfArrayA(cartItemsA));
	  /*
	  ResponseToOrder.teddies.orderId = "none";
	  ResponseToOrder.woodTables.orderId = "none";
	  ResponseToOrder.cameras.orderId = "none";
		*/
  }
}

async function handlerCartValidationExit(e){
	e.preventDefault();
	e.stopPropagation();
	window.location.href = "../cart/cart.html";
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
	
  document.getElementById('cartFinalValidation').addEventListener('click', handlerCartFinalValidation);
	document.getElementById('cartValidationExit').addEventListener('click', handlerCartValidationExit);
	
  //validateForm();
}

/****************************************************************/
/****************PROGRAM INSTRUCTIONS***************************/
/**************************************************************/

// CALL THE FUNCTIONS IN HERE

filterEvents();
