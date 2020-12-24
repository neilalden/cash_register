//const auth = firebase.auth();
const db = firebase.firestore();
const itemsRef = db.collection("items");

const allItemsList = document.getElementById("allItemsList");
const purchasedItemsList = document.getElementById("purchasedItemsList");
const searchTextbox = document.getElementById("searchTextbox");
const cancelBtn = document.getElementById("cancelBtn");
const checkOutBtn = document.getElementById("checkOutBtn");
const total = document.getElementById("total");
// name, cost & quantity
var allItemsArray = [];
// search result in allItemsArray
var resultAllItemsArray = [];
// name, cost & quantity
var purchasedItemsArray = [];

// onload main function

function main() {
	// display all items in all items
	itemsRef.onSnapshot((querySnapshot) => {
		allItemsArray = [];

		const items = querySnapshot.docs.map((doc) => {
			const name = doc.data().item_name;
			const desc = doc.data().item_desc;
			const cost = doc.data().item_cost;
			allItemsArray.push({ name, desc, cost });
			allItemsRender(allItemsArray);
		});
	});
}
main();

function addItem(name, desc, cost) {
	var index = purchasedItemsArray.findIndex((item) => item.name == name);
	if (index == -1) {
		purchasedItemsArray.push({ name, cost, quantity: 1 });
	} else {
		purchasedItemsArray[index].quantity += 1;
	}

	purchasedItemsRender(purchasedItemsArray);
}
function removeItem(itemName) {
	for (let i = 0; i < purchasedItemsArray.length; i++) {
		if (purchasedItemsArray[i].name == itemName) {
			purchasedItemsArray.splice(i, 1);
		}
	}
	purchasedItemsRender(purchasedItemsArray);
}
cancelBtn.addEventListener("click", () => {
	purchasedItemsArray = [];
	purchasedItemsRender(purchasedItemsArray);
});
checkOutBtn.addEventListener("click", () => {
	purchasedItemsArray = [];
	purchasedItemsRender(purchasedItemsArray);
});
searchTextbox.addEventListener("input", () => {
	const value = searchTextbox.value;
	const reg = new RegExp(value, "gi");
	resultAllItemsArray = [];
	for (let i = 0; i < allItemsArray.length; i++) {
		if (allItemsArray[i].name.match(reg)) {
			const name = allItemsArray[i].name;
			const desc = allItemsArray[i].desc;
			const cost = allItemsArray[i].cost;
			resultAllItemsArray.push({ name, desc, cost });
		}
	}
	allItemsRender(resultAllItemsArray);
});

//!!!!!!!!!!RENDER FUNCTION!!!!!!!!!!//
function purchasedItemsRender(items) {
	purchasedItemsList.innerHTML = "";
	total.innerHTML = "Total : ";
	let overAllTotal = 0;
	const newItems = items.map((item) => {
		//calling the function removeItem returns undefined unless item.name is stored in a variable
		const name = item.name;
		overAllTotal += item.quantity * item.cost;
		return (
			`<li><button id="removeItemBtn" onclick="removeItem(\`` +
			name +
			`\`)">
			<h3 >${name}</h3><p>${item.quantity}  -  ${
				item.quantity * item.cost
			} </p></button></li> `
		);
	});
	purchasedItemsList.innerHTML = newItems.join("");
	total.innerHTML = "Total : " + overAllTotal;
}
function allItemsRender(items) {
	const newItems = items.map((items) => {
		const name = items.name;
		const desc = items.desc;
		const cost = items.cost;
		return (
			`<li><button onclick="addItem(\`` +
			name +
			`\`,\`` +
			desc +
			`\`,\`` +
			cost +
			`\`)"><h3 >${name}</h3><p>${desc}</p> </button></li>`
		);
	});

	allItemsList.innerHTML = newItems.join("");
}
