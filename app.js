const form = document.querySelector('.todo-form'); //todoForm
const input = document.querySelector('.todo-input');
const button = document.querySelector('button');
const tasks = document.querySelector('.todo-list'); //todoList
const item = document.querySelector('.todo-item');

//creates and appends remove button
function addRemoveButton(el) {
    const removeX = document.createElement('button');
    removeX.innerText = 'X';
    removeX.classList.add('btn-remove');
    el.append(removeX);
}

//RETRIEVE FROM LOCALSTORAGE
//establish array for storing items
const savedItems = JSON.parse(localStorage.getItem('items')) || [];
//loop through savedItems array to populate todo list
for (let i = 0; i < savedItems.length; i++) {
  //create new item element for every index in array  
  let newTask = document.createElement("li");
  //create span to separate innerText from remove button within element
  let inputSpan = document.createElement('span');
  //set input of new span to innerText of corresponding saved item 
  inputSpan.innerText = savedItems[i].task;
  //set isCompleted state corresponding to stored item
  inputSpan.isCompleted = savedItems[i].isCompleted ? true : false;
  //add isCompleted CSS class
  if (inputSpan.isCompleted) {
    inputSpan.classList.add('isCompleted');
  }
  //append to to-do list
  newTask.append(inputSpan);
  //add CSS class
  newTask.classList.add('todo-item');
  //append new element to list section
  tasks.append(newTask);
  //add remove button
  addRemoveButton(newTask);
}


//submit new task on submit
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    if(input.value !== '') {
        //create blank li
        let newTask = document.createElement('li');
        //create span for input, apply input value, apply CSS, apply isCompleted state
        let inputSpan = document.createElement('span');
        inputSpan.innerText = input.value;
        inputSpan.isCompleted = false;
        newTask.append(inputSpan);
        newTask.classList.add('todo-item');
        //create 'X' button, apply css, append to newTask
        addRemoveButton(newTask);
        //append button li to todo list 
        tasks.append(newTask);
        //SAVE TO LOCALSTORAGE
        //when elements are created, push corresponding object (with task text and isCompleted state) to savedItems array (declared above)
        savedItems.push({ task: inputSpan.innerText, isCompleted: false });
        //save created object to "items" key in localStorage
        localStorage.setItem("items", JSON.stringify(savedItems));
        //reset form
        form.reset();
    }
});

//mark as completed or remove
tasks.addEventListener('click', function(event){
    let clickedItem = event.target;
    
    if(clickedItem.tagName === 'BUTTON') {
        //remove from page
        clickedItem.parentElement.remove();
        //REMOVE FROM LOCALSTORAGE
        //loop through savedItems array (declared above)
        for (let i = 0; i < savedItems.length; i++) {
            //console.log(savedItems[i].task, clickedItem.parentElement.innerText); <---don't worry about this line, it's for testing
            //check if innerText of clicked item === any item in the array, so it can be found and removed
            if (`${savedItems[i].task}X` === clickedItem.parentElement.innerText) {
                //remove the item at the matched index
                savedItems.splice(i, 1);
                //save alteration to localStorage
                localStorage.setItem("items", JSON.stringify(savedItems));
            }
        }

    } else if (clickedItem.tagName === 'SPAN') {
        //toggle isCompleted styles and localStorage state
        clickedItem.classList.toggle('isCompleted');
        if (!clickedItem.isCompleted) {
            clickedItem.isCompleted = true;
        }  else {
            clickedItem.isCompleted = false;  
        }          
        //SAVE ISCOMPLETED STATE TO LOCALSTORAGE
        //loop through savedItems array
        for (let i = 0; i < savedItems.length; i++) {
            // console.log(savedItems[i].task, clickedItem.innerText); <---don't worry about this line, it's for testing
            // check if innerText of clicked item === any item in the array, so it can be found and altered
            if (savedItems[i].task === clickedItem.innerText) {
            //match isCompleted state to the matched index in savedItems
            savedItems[i].isCompleted = clickedItem.isCompleted;
            //save alteration to localStorage
            localStorage.setItem("items", JSON.stringify(savedItems));
            }
        }
    }
});






