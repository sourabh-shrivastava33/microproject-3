import foodData from "./food.json" assert { type: "json" };
const allListItem = document.querySelector(".all");
const category = document.querySelector(".same-category");

const selectElement = document.querySelector(".select-category");
const selectCalorie = document.querySelector(".select-query");
const calorieRelated = document.querySelector(".calorie-related");
const allQuestions = document.querySelectorAll("li");
const highToLowProtein = document.querySelector(".high-to-low-protein");
const lowToHighCab = document.querySelector(".low-to-high-cab");
const tableBody = document.querySelector(".table-body");
const table = document.querySelector(".table-container");

// hiddening table if not any question is active
(function () {
	if (
		!Array.from(allQuestions).some((node) => node.classList.contains("active"))
	) {
		table.classList.add("hidden");
	}
})();
// 1.)
// handling all items listing
const handleAllItemListing = (e) => {
	maintainActiveClass(e.target);
	const items = foodData;

	maintainTableOfElement(items);
};
allListItem.addEventListener("click", handleAllItemListing);

// 2.)
// Handling select element to get items of particular category
const handleItemsByCategory = (e) => {
	if (e.target.classList.contains("select-category")) return;
	maintainActiveClass(e.target);
	const items = listItemByCategory(foodData, selectElement.value);
	maintainTableOfElement(items);
};

selectElement.addEventListener("change", (e) => {
	e.preventDefault();
	selectElement.value = e.target.value;
	const items = listItemByCategory(foodData, selectElement.value);
	maintainTableOfElement(items);
});
category.addEventListener("click", handleItemsByCategory);

// 3.)
// handle function to calorie related
const handleItemsByCalorie = (e) => {
	if (e.target.classList.contains("select-query")) return;

	maintainActiveClass(e.target);
	const items = listBySomeRelation(foodData, selectCalorie.value);

	maintainTableOfElement(items);
};
selectCalorie.addEventListener("change", (e) => {
	e.preventDefault();
	selectCalorie.value = e.target.value;
	const items = listBySomeRelation(foodData, selectCalorie.value);

	maintainTableOfElement(items);
});

calorieRelated.addEventListener("click", handleItemsByCalorie);

// 4.) handling high to low protein items listing
const handleHighProteinFirst = (e) => {
	maintainActiveClass(e.target);
	const items = sortedItemArrayByCategory(foodData, "protiens", "high-first");
	maintainTableOfElement(items);
};
highToLowProtein.addEventListener("click", handleHighProteinFirst);

// 5.)
const handleLowCabFirst = (e) => {
	maintainActiveClass(e.target);
	const items = sortedItemArrayByCategory(foodData, "cab", "low-first");
	maintainTableOfElement(items);
};
lowToHighCab.addEventListener("click", handleLowCabFirst);

// helper functions
function maintainActiveClass(targetElement) {
	allQuestions.forEach((el) => el.classList.remove("active"));
	table.classList.add("hidden");

	targetElement.classList.add("active");
	table.classList.remove("hidden");
}

function maintainTableOfElement(items) {
	tableBody.innerHTML = "";
	items.map((item) => appendingDataToTable(item));
}
function appendingDataToTable(item) {
	const { id, foodname, calorie, category, protiens, cab } = item;

	const html = `	<tr>
	<td class="id">${id}</td>
	<td class="id">${foodname}</td>
	<td class="id">${calorie}</td>
	<td class="id">${category}</td>
	<td class="id">${protiens}</td>
	<td class="id">${cab}</td>
</tr>`;

	tableBody.insertAdjacentHTML("beforeend", html);
}

// listAllItem(foodData);

// -------------------------------------------------------------------------//

// 2.) list all items with a particular  category
function listItemByCategory(itemsArray, category) {
	const filteredArray = itemsArray.filter((item) => item.category === category);
	return filteredArray;
}

// listItemByCategory(foodData, "Vegetable");
// listItemByCategory(foodData, "Protein");
// listItemByCategory(foodData, "Grain");
// listItemByCategory(foodData, "Dairy");
// listItemByCategory(foodData, "Nuts");
// listItemByCategory(foodData, "Vegetable");
// listItemByCategory(foodData, "Fruit");

// 3.) function to  list all items with some relation to category
function listBySomeRelation(
	itemsArray,
	relationQuery,
	category = "calorie",
	value = 100
) {
	let filteredArray;
	if (relationQuery === "greater")
		filteredArray = itemsArray.filter((item) => item[category] > value);
	if (relationQuery === "lesser")
		filteredArray = itemsArray.filter((item) => item[category] < value);
	return filteredArray;
}
// listBySomeRelation(foodData, "greater", "calorie", 100);
// listBySomeRelation(foodData, "lesser", "calorie", 100);

// 4.) function to sort array by category (lesser-first, higher-first)
function sortedItemArrayByCategory(data, category, type) {
	const dupData = data.slice();
	console.log(dupData);
	let modifier;
	if (type === "low-first") modifier = 1;
	if (type === "high-first") modifier = -1;
	if (!type) return data;

	const sortedArray = dupData.sort(
		(a, b) => (a[category] - b[category]) * modifier
	);
	return sortedArray;
}
// sortedItemArrayByCategory(foodData, "protiens", "high-first");
// sortedItemArrayByCategory(foodData, "cab", "low-first");
