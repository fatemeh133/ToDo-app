let addInput = document.querySelector(".add-input");

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

    let retrievedStringJson = localStorage.getItem("Tasks");
    let retrievedJson = JSON.parse(retrievedStringJson) || []; // Initialize to an empty array if null

    // Add the new task directly to the array
    retrievedJson.push({
      taskName: addInput.value.trim(),
      checkStat: "",
      labelClass: "",
    });
    const jsonString = JSON.stringify(retrievedJson);
    localStorage.setItem("Tasks", jsonString);

    addInput.value = "";
  }
}

function deleteObjectByName(nameToDelete) {
  let retrievedStringJson = localStorage.getItem("Tasks");
  let retrievedJson = JSON.parse(retrievedStringJson);

  console.log(retrievedJson.filter((obj) => obj.taskName !== nameToDelete));

  // Update retrievedJson after filtering
  retrievedJson = retrievedJson.filter((obj) => obj.taskName !== nameToDelete);

  let jsonString = JSON.stringify(retrievedJson);
  localStorage.setItem(`Tasks`, jsonString);
}

function updateCheckedByName(taskName, checkStat, labelClass) {
  const retrievedStringJson = localStorage.getItem("Tasks");
  const retrievedJson = JSON.parse(retrievedStringJson);

  for (let i = 0; i < retrievedJson.length; i++) {
    if (retrievedJson[i].taskName === taskName) {
      retrievedJson[i].checkStat = checkStat;
      retrievedJson[i].labelClass = labelClass;

      const jsonString = JSON.stringify(retrievedJson);
      localStorage.setItem(`Tasks`, jsonString);

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
  let checkStat = checkboxElement.parentElement.childNodes[1].checked
    ? "checked"
    : "";

  updateCheckedByName(`${taskName}`, `${checkStat}`, `${labelClass}`);
}

window.addEventListener("load", () => {
  const retrievedStringJson = localStorage.getItem("Tasks");
  const retrievedJson = JSON.parse(retrievedStringJson);
  if (retrievedJson) {
    console.log("Data browser:");
    console.log(retrievedJson);

    for (let i = 0; i < retrievedJson.length; i++) {
      //get all storage keys
      let itemName = retrievedJson[i].taskName;
      //make a task base on keys
      if (itemName !== null) {
        let task = `<div class="Task">
     <input type="checkbox" name="" id="task${i}"onclick="check(this)"${retrievedJson[i].checkStat}/><label class="${retrievedJson[i].labelClass}">
       ${itemName}</label> <img src="image/x.svg" alt="" class="close-icon" onclick="closeTask(this)"/> <img src="image/edit.svg" alt="" class="edit-icon" onclick="editTask(this)"/></div>`;

        document
          .querySelector(".container")
          .insertAdjacentHTML("beforeend", task);
      }
    }
  } else console.log("There is no task yet");
});

// function updateObjectByName(nameToUpdate, newName) {
//   const retrievedStringJson = localStorage.getItem("Tasks");
//   const retrievedJson = JSON.parse(retrievedStringJson);
//   console.log(retrievedJson);

//   for (let i = 0; i < retrievedJson.length; i++) {
//     if (retrievedJson[i].taskName === nameToUpdate) {
//       retrievedJson[i].taskName = newName;
//       console.log(retrievedJson);
//       // const jsonString = JSON.stringify(retrievedJson);
//       // localStorage.setItem(`Tasks`, jsonString);

//       break; // Stop the loop since we found and updated the object
//     }
//   }
// }
// updateObjectByName(`1`, `2`);

// function editTask(editElement) {
//   // console.log(editElement.parentElement);
//   // console.log(editElement.parentElement.childNodes[2].innerHTML.trim());
//   // let firstContent = editElement.parentElement.childNodes[2].innerHTML.trim();
//   // let taskElem = editElement.parentElement;
//   // taskElem.contentEditable = "true";
//   // editElement.parentElement.addEventListener("blur", () => {
//   //   taskElem.contentEditable = "false";
//   //   console.log(editElement.parentElement.childNodes[2]);
//   // });
// }
