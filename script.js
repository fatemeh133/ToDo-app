let addInput = document.querySelector(".add-input");
let taskJson = [];
//get tasks when reload
const retrievedArrayString = localStorage.getItem("Tasks");
let ConvertedJson = JSON.parse(retrievedArrayString);
if (ConvertedJson !== null) {
  taskJson = ConvertedJson;
}

// add new task function to use multiple times
function addNewTask(addInput) {
  addInput.focus();
  if (addInput.value !== "") {
    let task = `<div class="Task">
   <input type="checkbox" name="" id="task3"onclick="check(this)"/><label for="task3">
     ${addInput.value}</label> <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/></div>`;

    document.querySelector(".container").insertAdjacentHTML("beforeend", task);

    //new
    taskJson.push({
      taskName: `${addInput.value}`,
      checkStat: "",
      labelClass: "",
    });
    const jsonString = JSON.stringify(taskJson);
    localStorage.setItem(`Tasks`, jsonString);

    addInput.value = "";
  }
}

function updateCheckedByName(taskName, checkStat, labelClass) {
  const retrievedArrayString = localStorage.getItem("Tasks");
  const retrievedArray = JSON.parse(retrievedArrayString);

  for (let i = 0; i < retrievedArray.length; i++) {
    if (retrievedArray[i].taskName === taskName) {
      retrievedArray[i].checkStat = checkStat;
      retrievedArray[i].labelClass = labelClass;

      const jsonString = JSON.stringify(retrievedArray);
      localStorage.setItem(`Tasks`, jsonString);

      break; // Stop the loop since we found and updated the object
    }
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

  let taskName = checkboxElement.parentElement.childNodes[2].innerHTML.trim();
  let labelClass = checkboxElement.parentElement.childNodes[2].classList.value;
  let checkStat = checkboxElement.parentElement.childNodes[1].checked
    ? "checked"
    : "";

  updateCheckedByName(`${taskName}`, `${checkStat}`, `${labelClass}`);
}

window.addEventListener("load", () => {
  const retrievedArrayString = localStorage.getItem("Tasks");
  const retrievedArray = JSON.parse(retrievedArrayString);

  console.log(retrievedArray);

  for (let i = 0; i < retrievedArray.length; i++) {
    //get all storage keys
    let itemName = retrievedArray[i].taskName;
    //make a task base on keys
    if (itemName !== null) {
      let task = `<div class="Task">
     <input type="checkbox" name="" id="task${i}"onclick="check(this)"${retrievedArray[i].checkStat}/><label for="task${i}" class="${retrievedArray[i].labelClass}">
       ${itemName}</label> <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/></div>`;

      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeend", task);
    }
  }
});
