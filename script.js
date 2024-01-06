let addInput = document.querySelector(".add-input");

function getDataFromBrowser() {
  let retrievedStringJson = localStorage.getItem("Tasks");
  let retrievedJson = JSON.parse(retrievedStringJson) || []; // Initialize to an empty array if null
  return retrievedJson;
}

function setDataToBrowser(retrievedJson) {
  const jsonString = JSON.stringify(retrievedJson);
  localStorage.setItem("Tasks", jsonString);
}

function addNewTask() {
  addInput.focus();
  // if the input is not empty add task
  if (addInput.value.trim() !== "") {
    let task = `<div class="Task">
   <input type="checkbox" onclick="check(this)"/><label>${addInput.value.trim()}</label> 
   <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/> 
   <img src="image/edit.svg" alt="" class="edit-icon" onclick="editTask(this)"/>
   </div>`;

    document.querySelector(".container").insertAdjacentHTML("beforeend", task);

    let retrievedJson = getDataFromBrowser();

    // Add the new task directly to the array
    retrievedJson.push({
      taskName: addInput.value.trim(),
      checkStat: "",
      labelClass: "",
    });

    setDataToBrowser(retrievedJson);

    addInput.value = "";
  }
}

function deleteObjectByName(nameToDelete) {
  let retrievedJson = getDataFromBrowser();

  // Update retrievedJson after filtering
  retrievedJson = retrievedJson.filter((obj) => obj.taskName !== nameToDelete);

  setDataToBrowser(retrievedJson);
}

function updateCheckedByName(taskName, checkStat, labelClass) {
  const retrievedJson = getDataFromBrowser();

  for (let i = 0; i < retrievedJson.length; i++) {
    if (retrievedJson[i].taskName === taskName) {
      retrievedJson[i].checkStat = checkStat;
      retrievedJson[i].labelClass = labelClass;

      setDataToBrowser(retrievedJson);

      break; // Stop the loop since we found and updated the object
    }
  }
}

function addTaskBtn() {
  addNewTask();
}

addInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addNewTask();
  }
});

function closeTask(closeElement) {
  deleteObjectByName(
    `${closeElement.parentElement.childNodes[2].innerHTML.trim()}`
  );
  closeElement.parentElement.remove();
}

function check(checkboxElement) {
  let label = checkboxElement.parentElement.childNodes[2];
  label.classList.toggle("done");

  let taskName = checkboxElement.parentElement.childNodes[2].innerHTML.trim();
  let labelClass = checkboxElement.parentElement.childNodes[2].classList.value;
  let checkStat = checkboxElement.parentElement.childNodes[0].checked
    ? "checked"
    : "";

  updateCheckedByName(`${taskName}`, `${checkStat}`, `${labelClass}`);
}

window.addEventListener("load", () => {
  const retrievedJson = getDataFromBrowser();

  console.log("Data saved in your browser:");
  console.log(retrievedJson);

  for (let i = 0; i < retrievedJson.length; i++) {
    let itemName = retrievedJson[i].taskName;
    let checkStat = retrievedJson[i].checkStat;
    let labelClass = retrievedJson[i].labelClass;

    if (itemName !== null) {
      let task = `<div class="Task"><input type="checkbox" id="task${i}"onclick="check(this)"${checkStat}/>
        <label class="${labelClass}">${itemName}</label> 
        <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/> 
        <img src="image/edit.svg" alt="" class="edit-icon" onclick="editTask(this)"/></div>`;

      document
        .querySelector(".container")
        .insertAdjacentHTML("beforeend", task);
    }
  }
});

function updateObjectByName(nameToUpdate, newName) {
  const retrievedJson = getDataFromBrowser();

  for (let i = 0; i < retrievedJson.length; i++) {
    if (retrievedJson[i].taskName === nameToUpdate) {
      retrievedJson[i].taskName = newName;

      setDataToBrowser(retrievedJson);

      break; // Stop the loop since we found and updated the object
    }
  }
}

function editTask(editElement) {
  let firstContent = editElement.parentElement.childNodes[2].innerHTML.trim();

  let taskElem = editElement.parentElement.childNodes[2];
  taskElem.focus();
  taskElem.contentEditable = "true";
  taskElem.addEventListener("blur", () => {
    taskElem.contentEditable = "false";

    let changedcontent =
      editElement.parentElement.childNodes[2].innerHTML.trim();

    updateObjectByName(`${firstContent}`, `${changedcontent}`);
  });
}
