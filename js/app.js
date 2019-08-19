//Selecting the Elements

const clear = document.querySelector('.clear'); //Select the clear icon
const date = document.getElementById('date'); //select the date field
const list = document.getElementById('list'); //select the field where the to do items would display
const input = document.getElementById('input'); //The Add to do input
const time = document.getElementById('time'); //dsiplay the time

//Getting class names fir checkbox
const CHECK = "fa-check-circle";  //the check variable would  be used to add fa-check-circle
const UNCHECK = 'fa-circle-thin'; //the uncheck variable would be used to add fa-circle-thin
const LINETHROUGH = "lineThrough"; //the LINETHROUGH would be used to add the linethrough CSS class

//variables for deleting and updating content

let LIST = [];  //create an empty array where the users task would be stored 
let id = 0; //the id is the current id of tasks in the LIST. It's initialized to 0

//Working with Date and Time

let today, timer;

today = new Date();
date.innerHTML = today.toLocaleDateString();
console.log(date)
timer = new Date();
time.innerHTML = timer.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
options = {
    hour: 'numeric',
    time: 'numeric'
}


//Add task function

let addToDo = (toDo, id, done, bin) => {
 
    //bin means tasks that has been deleted. 
    if(bin){
        return
    }

//Here in line 44, i'm saying if a task has been marked as done, add the...????????? 
    const DONE = done ? CHECK : UNCHECK;
    console.log(DONE)
    const LINE = done ? LINETHROUGH : ""; //wahala fit dey here oo
    console.log(LINE)
    const position = 'beforeend';
    

    const item = `
    <li class="item">
    <i class="fa fa-circle-thin co ${DONE}" job="complete" id="0"> </i>
    <p class="text ${LINE} "> ${toDo}</p> 
    <i class="fa fa-trash-o de" job="delete" id="${id}">  </i>
    </li>
    `
   
    list.insertAdjacentHTML(position, item);
}


//add item when user hits the enter key


document.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        const task = input.value;

        //if the input is not empty
        if(task){
            addToDo(task, id, false, false );

            LIST.push({
                name: task,
                id: id,
                done: false,
                bin: false
            })
            id++;
            localStorage.setItem('TODO', JSON.stringify(LIST));
        }
        input.value = " ";
    }
});

//complete task

completeToDo = (element) => {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINETHROUGH);

    LIST[element.id].done = LIST[element.id].done? false : true;
}

//remove to do

removeToDo = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].bin = true;
}

//target the items created dynamically

list.addEventListener('click', (event) => {
    const element = event.target //return the clicked element
    const elementJob = element.attributes.job.value; //AHA! this logs 'complete' if a task has been marked but when i unmarked it, 
    //it still keeps on logging complete
    
    console.log(elementJob);

    if(elementJob === 'complete'){
        completeToDo(element);
    } else if (elementJob === 'delete' ){
        removeToDo(element);
    }else{
        return 
    }



    localStorage.setItem('TODO', JSON.stringify(LIST));
});

//LOCAL STORAGE

//get item from localStorage
let data = localStorage.getItem('TODO');
console.log(data); 

//check

const loadList = (array) => {
    array.forEach((item)=> {
        addToDo(item.name, item.id, item.done, item.bin );
    })
}
console.log(loadList);

clear.addEventListener('click', ()=>{
    localStorage.clear();
    location.reload();
})


if(data){
    LIST = JSON.parse(data);
    console.log(LIST)
    id = LIST.length;
    console.log(id);
    loadList(LIST);
}else {
    LIST = [];
    id = 1;
}



//add item to localStorage
localStorage.setItem('TODO', JSON.stringify(LIST));
