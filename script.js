function addTask() {
  let addInput = document.querySelector(".add-input");

  document.querySelector(".add-input").focus();
  if (addInput.value !== "") {
    let task = `<div class="Task">
     <input type="checkbox" name="" id="task3"onclick="check(this)"/><label for="task3">
       ${addInput.value}</label> <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/></div>`;

    document.querySelector(".container").insertAdjacentHTML("beforeend", task);
    addInput.value = "";
  }
}

function closeTask(closeElement) {
  closeElement.parentElement.remove();
}

function check(checkboxElement) {
  let label = checkboxElement.parentElement.childNodes[2];
  label.classList.toggle("done");
}
