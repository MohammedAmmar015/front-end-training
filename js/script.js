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

  let selectedCategory;
  const bottomLeftContent = document.getElementById("bottom-left-content");
  const bottomMiddleContent = document.getElementById("bottom-middle-content");
  const currentCategory = document.getElementById("item-title");
  const renderedCategories = document.getElementById("categories");
  const renderedItems = document.getElementById("items");
  const completedItems = document.getElementById("completed-items");
  const completedTitleContainer = document.getElementById("completed-title-container");
  const menuIcon = document.getElementById("menu-icon");
  const categoryTitleIcon = document.getElementById("category-title-icon");
  const createContainer = document.getElementById("create-container");
  const bottomRightContent = document.getElementById("bottom-right-content");
  const exitIcon = document.getElementById("exit-icon");
  const taskTitleSection = document.getElementById("task-title-section");
  const noteSection = document.getElementById("note-section");
  const addNote = document.getElementById("add-note");

  function init() {
    renderCategory();
    renderTask(false);
    renderCompletedTask();
    attachEventListeners();
  }

  function attachEventListeners() {
    document.getElementById("new-category").addEventListener("keypress", handleNewCategory);
    document.getElementById("new-item").addEventListener("keypress", handleNewTask);
    renderedCategories.addEventListener("click", handleSelectCategory, true);
    renderedItems.addEventListener("click", handleTaskFunctionality);
    renderedItems.addEventListener("mouseover", handleTaskFunctionality, true);
    renderedItems.addEventListener("mouseout", handleTaskFunctionality, true);
    completedItems.addEventListener("click", handleTaskFunctionality, true);
    completedTitleContainer.addEventListener("click", handleCompletedBar);
    menuIcon.addEventListener("click", handleMenuToggle);
    categoryTitleIcon.addEventListener("click", handleMenuToggle);
    exitIcon.addEventListener("click", handleTaskDetail);
    // addNote.addEventListener("keypress", handleNewNote);
    taskTitleSection.addEventListener("click", handleTaskFunctionality);
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
    if (selectedCategory == undefined) {
      renderedCategories.firstChild.className = "focused";
    } else {
      selectedCategory.className = "focused";
    }
  }

  function renderTask(isCompleted) {
    if (isCompleted) {
      completedItems.innerHTML = "";
    } else {
      renderedItems.innerHTML = "";
    }
    let currentCategoryName = currentCategory.innerText.trim();
    tasks.filter(task => task.isCompleted == isCompleted)
      .forEach(task => {
        task.category.forEach(categoryName => {
          if (categoryName === currentCategoryName) {
            let newItem = createHTMLElement("li",
              {
                className: "item-box",
                dataId: task.id
              });
            let iconContainer = createHTMLElement("div", { className: "item-icon-container" });
            let newIcon = createHTMLElement("i",
              {
                className: isCompleted ? "fa-solid fa-circle-check" : "fa-regular fa-circle",
                dataId: task.id
              });
            iconContainer.append(newIcon);

            newItem.appendChild(iconContainer);

            let itemNameContainer = createHTMLElement("div", { className: "item-name-container" });
            let itemName = createHTMLElement("div",
              {
                className: isCompleted ? "striked-task item name" : "item name",
                id: "item-name",
                value: task.name
              });
            let categoryName = createHTMLElement("div",
              {
                className: "category name",
                value: currentCategoryName
              });
            itemNameContainer.append(itemName);
            itemNameContainer.append(categoryName);

            newItem.appendChild(itemNameContainer);

            iconContainer = createHTMLElement("div", { className: "star item-icon-container" });
            let regularIcon = "fa-regular fa-star";
            let solidIcon = "fa-solid fa-star";
            newIcon = createHTMLElement("i",
              {
                className: task.isImportant ? solidIcon : regularIcon,
                dataId: task.id
              });
            iconContainer.append(newIcon);

            newItem.appendChild(iconContainer);

            if (isCompleted) {
              completedItems.append(newItem);
            } else {
              renderedItems.insertBefore(newItem, renderedItems.firstChild);
            }
          }
        })
      });
  }

  function renderCompletedTask() {
    renderTask(true);
    if (completedItems.children.length == 0) {
      completedTitleContainer.classList.add("hide-block");
    } else {
      completedTitleContainer.classList.remove("hide-block");
    }
  }

  function handleNewCategory(event) {
    let value = event.target.value.trim();
    if (event.key == "Enter" && value != "") {
      if (categories.filter(category => category.name == value).length > 0) {
        alert("Name already exists");
      } else {
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
  }

  function handleSelectCategory(event) {
    let menuCategories = renderedCategories.getElementsByTagName("li");
    let category = event.target;
    if (category.tagName != "LI") {
      category = category.parentElement;
    }
    if (category.tagName == "LI") {
      for (var i = 0; i < menuCategories.length; i++) {
        menuCategories[i].className = "default";
        if (i === 5) {
          menuCategories[i].className = "line";
        }
      }
      category.className = "focused";
      currentCategory.innerText = category.innerText;
      categoryTitleIcon.className = category.firstChild.className;
      if (currentCategory.innerText == "Assigned to me") {
        createContainer.classList.add("hide-block");
      } else {
        createContainer.classList.remove("hide-block");
        renderTask(false);
        renderCompletedTask();
      }
    }
  }

  function handleNewTask(event) {
    let currentCategoryName = currentCategory.innerText.trim();
    if (event.key == "Enter" && event.target.value.trim() != "") {
      let task = {
        id: tasks.length + 1,
        name: event.target.value,
        category: [currentCategoryName],
        isImportant: false,
        isCompleted: false,
        note: ""
      }
      if (currentCategoryName != "Tasks" && isDefaultCategory(currentCategoryName)) {
        task.category.push("Tasks");
      }
      if (currentCategoryName == "Important") {
        task.isImportant = true;
      }
      tasks.push(task);
      event.target.value = "";
      renderTask(false);
      renderCompletedTask();
    }
  }

  function handleTaskFunctionality(event) {
    if (event.target.tagName == "I") {
      if (event.target.className == "fa-regular fa-star" || event.target.className == "fa-solid fa-star") {
        handleImportantTask(event);
      } else {
        handleCompletedTask(event)
      }
    } else if (event.target.tagName == "LI") {
      handleTaskDetail(event);
    }
  }

  function handleImportantTask(event) {
    if (event.type == "click") {
      let taskId = parseInt(event.target.getAttribute("data-id"));
      if (event.target.className == "fa-regular fa-star") {
        event.target.className = "fa-solid fa-star";
        addToImportant(taskId, "Important");
      } else if (event.target.className == "fa-solid fa-star") {
        event.target.className = "fa-regular fa-star";
        // let taskId = parseInt(event.target.parentElement.parentElement.getAttribute("data-id"));
        removeFromImportant(taskId, "Important");
      }
      renderTask(false);
      renderCompletedTask();
      renderTaskDetail(taskId);
    }
  }

  function addToImportant(taskId, category) {
    let taskIndex = getTaskIndexById(taskId);
    let categoryIndex = tasks[taskIndex].category.indexOf(category);
    if (categoryIndex == -1) {
      if (!(tasks[taskIndex].isCompleted)) {
        tasks[taskIndex].category.push(category);
      }
    }
    tasks[taskIndex].isImportant = true;
  }

  function removeFromImportant(taskId, category) {
    let taskIndex = getTaskIndexById(taskId);
    let categoryIndex = tasks[taskIndex].category.indexOf(category);
    tasks[taskIndex].category.splice(categoryIndex, 1);
    tasks[taskIndex].isImportant = false;
  }

  function getTaskIndexById(id) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(id)) {
        return i;
      }
    }
  }

  function handleCompletedTask(event) {
    console.log(event);
    if (event.type == "click") {
      if (event.target.className == "fa-regular fa-circle-check") {
        let completedItem = event.target;
        let taskId = parseInt(completedItem.getAttribute("data-id"));
        let index = getTaskIndexById(taskId);
        tasks[index].isCompleted = true;
        let indexOfImportant = tasks[index].category.indexOf("Important");
        if (indexOfImportant != -1) {
          tasks[index].category.splice(indexOfImportant, 1);
        }
        renderTask(false);
        renderCompletedTask();
        renderTaskDetail(taskId);
      } else if (event.target.className == "fa-solid fa-circle-check") {
        let completedItem = event.target;
        let taskId = parseInt(completedItem.getAttribute("data-id"));
        let index = getTaskIndexById(taskId);
        tasks[index].isCompleted = false;
        let indexOfImportant = tasks[index].category.indexOf("Important");
        if (indexOfImportant != -1) {
          tasks[index].category.splice(indexOfImportant, 1);
        }
        renderTask(false);
        renderCompletedTask();
        renderTaskDetail(taskId);
      }
    } else if (event.type == "mouseover" && event.target.className == "fa-regular fa-circle") {
      event.target.className = "fa-regular fa-circle-check";
    } else if (event.type == "mouseout" && event.target.className == "fa-regular fa-circle-check") {
      event.target.className = "fa-regular fa-circle";
    }
  }

  function handleCompletedBar(event) {
    if (event.target.tagName == "DIV") {
      if (event.target.children[0].className == "fa-solid fa-chevron-down") {
        event.target.children[0].className = "fa-solid fa-chevron-right";
        completedItems.classList.add("hide-block");
      } else if (event.target.children[0].className == "fa-solid fa-chevron-right") {
        completedItems.classList.remove("hide-block");
        event.target.children[0].className = "fa-solid fa-chevron-down";
      }
    }
  }

  function handleMenuToggle(event) {
    if (event.target.className == "menu-icon fa-solid fa-bars") {
      bottomLeftContent.classList.add("hide-block");
      bottomMiddleContent.classList.add("full-screen");
    } else if (event.target.id = "category-title-icon") {
      bottomLeftContent.classList.remove("hide-block");
      bottomMiddleContent.classList.remove("full-screen");
    }
  }

  function handleTaskDetail(event) {
    if (event.type == "click" && event.target.tagName == "LI") {
      bottomRightContent.classList.add("show-block");
      bottomMiddleContent.classList.add("mid-screen");
      renderTaskDetail(event.target.getAttribute("data-id"));
    } else if (event.target.id == "exit-icon") {
      bottomRightContent.classList.remove("show-block");
      bottomMiddleContent.classList.remove("mid-screen");
    }
  }

  function renderTaskDetail(taskId) {
    taskTitleSection.innerHTML = "";
    let taskIndex = getTaskIndexById(taskId);
    let task = tasks[taskIndex];
    let checkIconContainer = createHTMLElement("div", { className: "section-icon" });
    let regularIcon = "fa-regular fa-circle";
    let solidIcon = "fa-solid fa-circle-check";
    let checkIcon = createHTMLElement("i",
      {
        className: task.isCompleted ? solidIcon : regularIcon,
        dataId: taskId
      });
    checkIconContainer.append(checkIcon);
    let nameContainer = createHTMLElement("div", { className: task.isCompleted ? "striked section-name" : "section-name" });
    nameContainer.innerText = task.name;
    let starIconContainer = createHTMLElement("div", { className: "section-icon" });
    regularIcon = "fa-regular fa-star";
    solidIcon = "fa-solid fa-star";
    let starIcon = createHTMLElement("i",
      {
        className: task.isImportant ? solidIcon : regularIcon,
        dataId: taskId
      });
    starIconContainer.append(starIcon)
    taskTitleSection.append(checkIconContainer);
    taskTitleSection.append(nameContainer);
    taskTitleSection.append(starIconContainer);
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
    if (attributes.dataId != null) {
      element.setAttribute("data-id", attributes.dataId);
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