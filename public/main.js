//const auth = firebase.auth();
const db = firebase.firestore();
const itemsRef = db.collection("items");

const allItemsList = document.getElementById("allItemsList");
const purchasedItemsList = document.getElementById("purchasedItemsList");
const total = document.getElementById("total");
const cancelBtn = document.getElementById("cancelBtn");

// onload main function

function main() {
	// display all items in all items
	itemsRef.onSnapshot((querySnapshot) => {
		const items = querySnapshot.docs.map((doc) => {
			const name = doc.data().item_name;
			const cost = doc.data().item_cost;
			const desc = doc.data().item_desc;
			return (
				`<li><button onclick="addItem(\`` +
				name +
				`\`,\`` +
				desc +
				`\`,\`` +
				cost +
				`\`)"><h3 >${name}</h3><p>${desc}</p></button></li>`
			);
		});
		allItemsList.innerHTML = items.join("");
	});
}
main();

let arrayList = [];
function addItem(name, desc, cost) {
	var index = arrayList.findIndex((item) => item.name == name);
	if (index == -1) {
		arrayList.push({ name, cost, quantity: 1 });
	} else {
		arrayList[index].quantity += 1;
	}
	cartRender(arrayList);
}
cancelBtn.addEventListener("click", () => {
	arrayList = [];
	cartRender(arrayList);
});

//!!!!!!!!!!RENDER FUNCTION!!!!!!!!!!//
function cartRender(items) {
	purchasedItemsList.innerHTML = "";
	total.innerHTML = "Total : ";
	let overAllTotal = 0;
	items.map((item) => {
		purchasedItemsList.innerHTML += `<li>${item.name} ${item.quantity}  -  ${
			item.quantity * item.cost
		}</li>`;
		overAllTotal += item.quantity * item.cost;
	});
	total.innerHTML = "Total : " + overAllTotal;
}
