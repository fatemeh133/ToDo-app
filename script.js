let addInput = document.querySelector(".add-input");

// add new task function to use multiple times
function addNewTask(addInput) {
  addInput.focus();
  if (addInput.value !== "") {
    let task = `<div class="Task">
   <input type="checkbox" name="" id="task3"onclick="check(this)"/><label for="task3">
     ${addInput.value}</label> <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/></div>`;

    document.querySelector(".container").insertAdjacentHTML("beforeend", task);
    localStorage.setItem(`${addInput.value}`, `${addInput.value}`);
    addInput.value = "";
  }
}

function addTaskBtn() {
  addNewTask(addInput);
}

addInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addNewTask(addInput);
  }
});

function closeTask(closeElement) {
  closeElement.parentElement.remove();
  //remove from storage
  let label = closeElement.parentElement.childNodes[2];
  localStorage.removeItem(`${label.innerHTML.trim()}`);
}

function check(checkboxElement) {
  let label = checkboxElement.parentElement.childNodes[2];
  label.classList.toggle("done");
}

window.addEventListener("load", () => {
  for (let i = 0; i < Object.entries(localStorage).length; i++) {
    //get all storage keys
    let itemName = localStorage.getItem(
      `${Object.entries(localStorage)[i][0]}`
    );
    //make a task base on keys
    if (itemName !== null) {
      let task = `<div class="Task">
     <input type="checkbox" name="" id="task3"onclick="check(this)"/><label for="task3">
       ${itemName}</label> <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/></div>`;

      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeend", task);
    }
  }
});
