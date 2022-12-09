(function attachEventListeners() {
  document.querySelector(".container").addEventListener("click", handleLeftBar, true);
  document.querySelector(".search-box").addEventListener("focus", handleClearButton);
  document.querySelector(".search-box").addEventListener("blur", handleClearButton);
  document.querySelector(".bottom-left-content .categories")
    .addEventListener("click", handleCategoryFocus, true);
  document.getElementById("new-category").addEventListener("keypress", handleNewCategory);
  document.querySelector(".group-icon-container").addEventListener("click", handleGroupInput);
  document.getElementById("new-group").addEventListener("keypress", handleNewGroup);
  document.getElementById("new-item").addEventListener("keypress", handleAddButton);
  document.querySelector(".bottom-middle-content .list.items")
    .addEventListener("click", handleItemCheck, true);
  document.querySelector(".bottom-middle-content .list.items")
    .addEventListener("mouseout", handleItemCheck, true);
  document.querySelector(".bottom-middle-content .list.items")
    .addEventListener("mouseover", handleItemCheck, true);
  document.querySelector(".bottom-middle-content .items .item-conditions .button-container .add-btn")
    .addEventListener("click", handleNewItem);
  document.querySelector(".bottom-middle-content .completed-title-container")
    .addEventListener("click", handleCompletedItems, true);

})();

(function dateGenerate() {
  let now = new Date().toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });
  document.querySelector(".created-date").innerText = now;
})();

(function defaultCategory() {
  let defaultCategory = document.querySelector(".bottom-left-content .categories li:first-child");
  defaultCategory.click();
})();

function handleLeftBar(e) {
  if (e.target.className == "menu-icon fa-solid fa-bars") {
    let middleContent = document.getElementById("bottom-middle-content");
    let hiddenMenuIcon = document.getElementById("hidden-menu-icon");
    let categoryIcon = document.getElementById("category-title-icon");
    let navBar = document.getElementById("nav-bar");
    let display = navBar.style.display;
    console.log(display);
    if (display == "none") {
      navBar.style.display = "inline-block";
      middleContent.style.width = "76.7%";
      hiddenMenuIcon.style.display = "none";
      categoryIcon.style.display = "inline-block";
      document.querySelector(".bottom-middle-content .items-toolbar .created-date")
        .style.marginLeft = "0px";
    } else {
      navBar.style.display = "none";
      middleContent.style.width = "100%";
      hiddenMenuIcon.style.display = "inline-block";
      categoryIcon.style.display = "none";
      document.querySelector(".bottom-middle-content .items-toolbar .created-date")
        .style.marginLeft = "30px";
    }
  }
}

function handleClearButton(e) {
  let clearIcon = document.getElementById("clear-icon");
  if (e.type == "focus") {
    clearIcon.style.display = "inline-block";
  } else {
    clearIcon.style.display = "none";
  }
}

function handleCategoryFocus(e) {
  let category = e.target;
  if (category.tagName != "LI") {
    category = category.parentElement;
  }
  if (category.tagName == "LI") {
    let categories = document.querySelectorAll(".categories li");
    categories.forEach(category => {
      category.removeAttribute("style");
    });
    category.style.backgroundColor = "#ecf6fd";
    category.style.borderLeft = "2px solid #2564cf";
    category.style.fontWeight = "600";
    category.style.paddingLeft = "26px";

    let middleContent = document.getElementById("bottom-middle-content");
    let categoryTitle = middleContent.querySelector(".items-toolbar .item-title-container .item-title");
    let categoryTitleIcon =
      middleContent.querySelector(".items-toolbar .item-title-container #category-title-icon");
    if (category.innerText.trim() == "Assigned to me") {
      categoryTitle.style.color = "green";
      categoryTitleIcon.style.color = "green";
    } else if (category.innerText.trim() != "My Day") {
      categoryTitle.style.color = "#2564cf";
      categoryTitleIcon.style.color = "#2564cf";
    } else {
      categoryTitle.style.color = "black";
      categoryTitleIcon.style.color = "black";
    }
    let categoryIcon = category.querySelector(".left-category-icon").className;
    categoryTitleIcon.className = categoryIcon;
    categoryTitle.innerText = category.innerText;
  }
}

function handleNewCategory(e) {
  if (e.key == "Enter" && e.target.value.trim() != "") {
    let list = document.getElementById("categories");
    let newCategory = document.createElement("li");
    let newIcon = document.createElement("i");
    newIcon.className = "left-category-icon fa-solid fa-bars";
    let categoryName = document.createTextNode(e.target.value);
    newCategory.append(newIcon);
    newCategory.append(categoryName);
    list.append(newCategory);
    e.target.value = "";
  }
}

function handleGroupInput(e) {
  let createGroup = document.querySelector(".create.group");
  let display = createGroup.style.display;
  if (display == "none") {
    createGroup.style.display = "inline-block";
  } else {
    createGroup.style.display = "none";
  }
}

function handleNewGroup(e) {
  if (e.key == "Enter" && e.target.value != "") {
    let list = document.getElementById("categories");
    let newCategory = document.createElement("li");
    let newIcon = document.createElement("i");
    newIcon.className = "left-category-icon fa-solid fa-layer-group";
    let categoryName = document.createTextNode(e.target.value);
    newCategory.append(newIcon);
    newCategory.append(categoryName);
    list.append(newCategory);
    newCategory.addEventListener("click", handleCategoryFocus);
    e.target.value = "";
  }
}

function handleAddButton(e) {
  if (e.key == "Enter" && e.target.value != "") {
    let addButton
      = document.querySelector(".bottom-middle-content .items " +
        ".item-conditions .button-container .add-btn");
    addButton.click();
  }
}

function handleNewItem(e) {
  let input = document.querySelector(".bottom-middle-content .items .item-box .add-item");
  if (input.value.trim() != "") {
    let items = document.querySelector(".bottom-middle-content .list.items");
    let newItem = document.createElement("li");
    newItem.className = "item-box";

    let iconContainer = document.createElement("div");
    iconContainer.className = "item-icon-container";
    let newIcon = document.createElement("i");
    newIcon.className = "check fa-regular fa-circle";
    iconContainer.append(newIcon);

    newItem.appendChild(iconContainer);

    let itemNameContainer = document.createElement("div");
    itemNameContainer.className = "item-name-container";
    let itemName = document.createElement("div");
    itemName.className = "item name";
    itemName.innerText = input.value;
    let categoryName = document.createElement("div");
    categoryName.className = "category name";
    categoryName.innerText
      = document.querySelector(".items-toolbar .item-title-container .item-title").innerText;
    itemNameContainer.append(itemName);
    itemNameContainer.append(categoryName);
    newItem.appendChild(itemNameContainer);

    iconContainer = document.createElement("div");
    iconContainer.className = "star item-icon-container";
    newIcon = document.createElement("i");
    newIcon.className = "fa-regular fa-star";
    iconContainer.append(newIcon);
    newItem.appendChild(iconContainer);

    items.insertBefore(newItem, items.firstChild);
    input.value = "";
  }
}

function handleItemCheck(e) {
  if (e.target.classList[0] == "check") {
    if (e.type == "click") {
      let items = document.querySelector(".bottom-middle-content .completed.items");
      e.target.className = "check fa-solid fa-circle-check";
      let completedItem = e.target.parentElement.parentElement;
      let itemName = completedItem.querySelector(".item-name-container .item.name");
      itemName.innerHTML = itemName.innerText.strike();

      items.appendChild(completedItem);
    } else if (e.type == "mouseover") {
      e.target.className = "check fa-regular fa-circle-check";
    } else if (e.type == "mouseout") {
      e.target.className = "check fa-regular fa-circle";
    }
  }
}

function handleImportantIcon(e) {
  if (e.target.className == "fa-solid fa-star") {
    e.target.className = "fa-regular fa-star"
  } else if (e.target.className == "fa-regular fa-star") {
    e.target.className = "fa-solid fa-star"
  }
}

function handleCompletedItems(e) {
  let completedItems = document.querySelector(".bottom-middle-content .completed.items");
  let viewIcon = document.querySelector(".bottom-middle-content .completed-title-container i");
  if (completedItems.style.display == "none") {
    completedItems.style.display = "inline-block";
    viewIcon.className = "fa-solid fa-chevron-down";
  } else {
    completedItems.style.display = "none";
    viewIcon.className = "fa-solid fa-chevron-right";
  }
}