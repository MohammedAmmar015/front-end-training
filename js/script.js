"use strict";
(() => {
  var categories = [
    {
      id: 1,
      name: "My Day",
      iconClass: "fa-regular fa-sun",
      isDefault: true
    },
    {
      id: 2,
      name: "Important",
      iconClass: "fa-regular fa-star",
      isDefault: true
    },
    {
      id: 3,
      name: "Planned",
      iconClass: "fa-regular fa-calendar",
      isDefault: true
    },
    {
      id: 4,
      name: "Assigned to me",
      iconClass: "fa-regular fa-user",
      isDefault: true
    },
    {
      id: 5,
      name: "Tasks",
      iconClass: "fa-solid fa-house",
      isDefault: true,
      isLastDefault: true
    }
  ];

  var tasks = [];

  var selectedCategory;
  const currentCategory = document.getElementById("item-title");
  const renderedCategories = document.getElementById("categories");
  const renderedItems = document.getElementById("items");

  function init() {
    renderCategory();
    renderTask();
    attachEventListeners();
  }

  function attachEventListeners() {
    document.getElementById("new-category").addEventListener("keypress", handleNewCategory);
    document.getElementById("new-item").addEventListener("keypress", handleNewTask);
    renderedCategories.addEventListener("click", handleSelectCategory, true);
    renderedItems.addEventListener("click", handleImportantTask, true);
  }

  function renderCategory() {
    renderedCategories.innerHTML = "";
    categories.forEach(category => {
      let newCategory = createHTMLElement("li", { className: "default" });
      let newIcon = createHTMLElement("i", { className: category.iconClass });
      let categoryName = createHTMLTextNode(category.name);
      newCategory.append(newIcon);
      newCategory.append(categoryName);
      renderedCategories.append(newCategory);
      if (category.isLastDefault) {
        let lineBreak = createHTMLElement("li", { className: "line" });
        renderedCategories.append(lineBreak);
      }
    });
    console.log(selectedCategory);
    if (selectedCategory == undefined) {
      renderedCategories.firstChild.className = "focused";
    } else {
      selectedCategory.className = "focused";
    }
  }

  function renderTask() {
    renderedItems.innerHTML = "";
    let currentCategoryName = currentCategory.innerText.trim();
    tasks.forEach(task => {
      task.category.forEach(categoryName => {
        if (categoryName === currentCategoryName) {
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
          let regularIcon = "fa-regular fa-star";
          let solidIcon = "fa-solid fa-star";
          newIcon = createHTMLElement("i", { className: task.isImportant ? solidIcon : regularIcon });
          iconContainer.append(newIcon);

          newItem.appendChild(iconContainer);

          renderedItems.insertBefore(newItem, renderedItems.firstChild);
        }
      })
    });
  }

  function handleNewCategory(event) {
    if (event.key == "Enter" && event.target.value.trim() != "") {
      let category = {
        id: categories.length + 1,
        name: event.target.value,
        iconClass: "fa-solid fa-list-ul"
      }
      categories.push(category);
      event.target.value = "";
      renderCategory();
    }
  }

  function handleSelectCategory(event) {
    let menuCategories = renderedCategories.getElementsByTagName("li");
    let category = event.target;
    if (category.tagName != "LI") {
      category = category.parentElement;
    }
    if (category.tagName == "LI") {
      selectedCategory = category;
      for (var i = 0; i < menuCategories.length; i++) {
        menuCategories[i].className = "default";
        if (i === 5) {
          menuCategories[i].className = "line";
        }
      }
      category.className = "focused";
      currentCategory.innerText = category.innerText;
      renderTask();
    }
  }

  function handleNewTask(event) {
    let currentCategoryName = currentCategory.innerText.trim();
    if (event.key == "Enter" && event.target.value.trim() != "") {
      let task = {
        id: tasks.length + 1,
        name: event.target.value,
        category: [currentCategoryName],
        isImportant: false
      }
      if (currentCategoryName != "Tasks" && isDefaultCategory(currentCategoryName)) {
        task.category.push("Tasks");
      }
      if (currentCategoryName == "Important") {
        task.isImportant = true;
      }
      console.log(task);
      tasks.push(task);
      event.target.value = "";
      renderTask();
    }
  }

  function handleImportantTask(event) {
    if (event.target.tagName == "I") {
      if (event.target.className == "fa-regular fa-star") {
        console.log("event occured");
        event.target.className = "fa-solid fa-star";
        let taskName = event.target.parentElement.parentElement.getElementsByClassName("item name")[0].innerText.trim();
        addToImportant(taskName, "Important");
      } else if (event.target.className == "fa-solid fa-star") {
        event.target.className = "fa-regular fa-star";
        let taskName = event.target.parentElement.parentElement.getElementsByClassName("item name")[0].innerText.trim();
        removeFromImportant(taskName, "Important");
      }
      renderTask();
    }
  }

  function addToImportant(taskName, category) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name === taskName) {
        if (tasks[i].category.indexOf(category) == -1) {
          tasks[i].category.push(category);
        }
        tasks[i].isImportant = true;
      }
    }
  }

  function removeFromImportant(taskName, category) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name === taskName) {
        let index = tasks[i].category.indexOf(category);
        tasks[i].category.splice(index, 1);
        tasks[i].isImportant = false;
      }
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

  function isDefaultCategory(categoryName) {
    return categories.filter(category => category.name === categoryName &&
      category.isDefault == true).length > 0;
  }

  init();

})();