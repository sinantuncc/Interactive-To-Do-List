"use strict";

const storedList = JSON.parse(localStorage.getItem("list"));

const list = storedList ?? [];

const d = new Date();

document.getElementById("date").innerText = d.toLocaleDateString();

showItem(list);



document.getElementById("addButton").addEventListener("click", handleClick);
document.getElementById("addInput").addEventListener("keypress", function(e){
  if(e.key === "Enter") {
    handleClick();
  }
});

function handleClick() {
  let addInput = document.getElementById("addInput");

  const newItem = addInput.value;

  if (newItem) {
    newItem.trim();
    let objItem = {
      id: list.length + 1,
      title: newItem,
      created: Date.now(),
      checked: false,
    };

    list.unshift(objItem);
    addInput.value = "";
    localStorage.setItem("list", JSON.stringify(list));

    showItem(list);
  }
}

function showItem(list) {
  let ulList = document.getElementById("ulList");

  if (list.length === 0) {
    ulList.innerHTML = "List is empty!";
    return;
  }

  ulList.innerHTML = "";

  list.forEach((item, index) => {
    let spanItem = document.createElement("span");
    spanItem.innerText = item.title;
    if (item.checked) {
      spanItem.setAttribute("class", "checked");
    }

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", item.id);
    checkbox.setAttribute("class", "checkbox");
    if (item.checked) {
      checkbox.setAttribute("checked", true);
    }
    checkbox.addEventListener("click", function () {
      spanItem.classList.toggle("checked");

      if (item.checked) {
        list[index].checked = false;
      } else {
        list[index].checked = true;
      }

      localStorage.setItem("list", JSON.stringify(list));
    });

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
      list.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(list));
      showItem(list);
    });

    let span = document.createElement("span");
    span.setAttribute("id", "date");
    span.setAttribute("class", "date");
    let d = new Date(item.created);
    let day = d.toLocaleDateString();
    let time = d.toLocaleTimeString();
    span.innerText = "Created: " + day + " " + time;

    let hr = document.createElement("hr");
    let li = document.createElement("li");

    li.append(checkbox, spanItem, deleteButton);
    ulList.append(li, span, hr);
  });
}

function filterItem() {
  let search = document.getElementById("filter").value;

  if (search !== "" && list.length !== 0) {
    const filteredList = list.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    showItem(filteredList);
  } else {
    showItem(list);
  }
}
