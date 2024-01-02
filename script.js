let addInput = document.querySelector(".add-input");

// add new task function to use multiple times
function addNewTask(addInput) {
  addInput.focus();
  if (addInput.value !== "") {
    let task = `<div class="Task">
   <input type="checkbox" name="" id="task3"onclick="check(this)"/><label for="task3">
     ${addInput.value}</label> <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/></div>`;

    document.querySelector(".container").insertAdjacentHTML("beforeend", task);
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
}

function check(checkboxElement) {
  let label = checkboxElement.parentElement.childNodes[2];
  label.classList.toggle("done");
}
