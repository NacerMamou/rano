
var ResponseToOrder = {};
ResponseToOrder = JSON.parse(localStorage.getItem("ResponseToOrder"));

async function updatePageInfos(){
  document.getElementById('teddiesOrder-Id').textContent = ResponseToOrder.teddies.orderId;
	document.getElementById('woodTablesOrder-Id').textContent = ResponseToOrder.woodTables.orderId;
	document.getElementById('camerasOrder-Id').textContent = ResponseToOrder.cameras.orderId;
  ResponseToOrder.teddies.orderId = "none";
	ResponseToOrder.woodTables.orderId = "none";
	ResponseToOrder.cameras.orderId = "none";

  localStorage.setItem("ResponseToOrder", JSON.stringify(ResponseToOrder));
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
  updatePageInfos();
  document.getElementById('continueShopping').addEventListener('click', (e)=>{
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "../index.html";
  });
}

/****************************************************************/
/****************PROGRAM INSTRUCTIONS***************************/
/**************************************************************/

// CALL THE FUNCTIONS IN HERE

filterEvents();