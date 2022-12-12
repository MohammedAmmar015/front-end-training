(() => {
  var categories = [
    {
      id: 1,
      name: "My Day",
      iconClass: "fa-regular fa-sun"
    },
    {
      id: 2,
      name: "Important",
      iconClass: "fa-regular fa-star"
    },
    {
      id: 3,
      name: "Planned",
      iconClass: "fa-regular fa-calendar"
    },
    {
      id: 4,
      name: "Assigned to me",
      iconClass: "fa-regular fa-user"
    },
    {
      id: 5,
      name: "Tasks",
      iconClass: "fa-solid fa-house"
    }
  ];

  var tasks = [];

  var currentCategory = document.getElementById("item-title");

  function init() {
    renderCategory();
    renderTask();
    attachEventListeners();
  }

  function attachEventListeners() {
    document.getElementById("new-category").addEventListener("keypress", handleNewCategory);
    document.getElementById("new-item").addEventListener("keypress", handleNewTask);
    document.getElementById("category-container").addEventListener("click", handleSelectCategory, true);
  }

  function renderCategory() {
    let oldCategoryList = document.getElementById("categories");
    let newCategoryList = createHTMLElement("ul", {
      className: oldCategoryList.className,
      id: oldCategoryList.id
    });
    categories.forEach(category => {
      let newCategory = createHTMLElement("li", { className: "default" });
      let newIcon = createHTMLElement("i", { className: category.iconClass });
      let categoryName = createHTMLTextNode(category.name);
      newCategory.append(newIcon);
      newCategory.append(categoryName);
      newCategoryList.append(newCategory);
    });
    oldCategoryList.replaceWith(newCategoryList);
  }

  function renderTask() {
    let currentCategoryName = document.getElementById("item-title").innerText.trim();
    let currentCategoryId = categories.find(category => category.name === currentCategoryName).id;
    let oldItems = document.getElementById("items");
    let newItems = createHTMLElement("ul", { className: oldItems.className, id: oldItems.id });
    tasks.filter(task => task.categoryId === currentCategoryId)
      .forEach(task => {
        let newItem = createHTMLElement("li", { className: "item-box" });
        let iconContainer = createHTMLElement("div", { className: "item-icon-container" });
        let newIcon = createHTMLElement("i", { className: "check fa-regular fa-circle" });
        iconContainer.append(newIcon);

        newItem.appendChild(iconContainer);

        let itemNameContainer = createHTMLElement("div", { className: "item-name-container" });
        let itemName = createHTMLElement("div", { className: "item name", value: task.name });
        let categoryName = createHTMLElement("div", { className: "category name", value: currentCategoryName });
        itemNameContainer.append(itemName);
        itemNameContainer.append(categoryName);

        newItem.appendChild(itemNameContainer);

        iconContainer = createHTMLElement("div", { className: "star item-icon-container" });
        newIcon = createHTMLElement("i", { className: "fa-regular fa-star" });
        iconContainer.append(newIcon);

        newItem.appendChild(iconContainer);

        newItems.insertBefore(newItem, newItems.firstChild);
      });
    oldItems.replaceWith(newItems);
  }

  function handleNewCategory(event) {
    if (event.key == "Enter" && event.target.value.trim() != "") {
      let category = {
        id: categories.length + 1,
        name: event.target.value,
        iconClass: "fa-solid fa-bars"
      }
      categories.push(category);
      event.target.value = "";
      renderCategory();
    }
  }

  function handleSelectCategory(event) {
    let categoryList = document.getElementById("categories");
    let menuCategories = categoryList.getElementsByTagName("li");
    let category = event.target;
    if (category.tagName != "LI") {
      category = category.parentElement;
    }
    if (category.tagName == "LI") {
      for (var i = 0; i < menuCategories.length; i++) {
        menuCategories[i].className = "default";
      }
      category.className = "focused";
      currentCategory.innerText = category.innerText;
      renderTask();
    }
  }

  function handleNewTask(event) {
    let currentCategoryId
      = categories.find(category => category.name === currentCategory.innerText.trim()).id;
    if (event.key == "Enter" && event.target.value.trim() != "") {
      let task = {
        id: tasks.length + 1,
        name: event.target.value,
        categoryId: currentCategoryId
      }
      tasks.push(task);
      event.target.value = "";
      renderTask();
    }
  }

  function createHTMLElement(type, attributes) {
    let element = document.createElement(type);
    if (attributes.className != null) {
      element.className = attributes.className;
    }
    if (attributes.id != null) {
      element.id = attributes.id;
    }
    if (attributes.value != null) {
      element.innerText = attributes.value;
    }
    return element;
  }

  function createHTMLTextNode(text) {
    let element = document.createTextNode(text);
    return element;
  }

  init();

})();