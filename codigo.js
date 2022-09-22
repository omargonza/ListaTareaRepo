
//con esta funcion corrobora que este registrado y evite que se ingrese primero a esta pagina
const init= ()=>{
    localStorage.getItem("usuario") === null ? window.location.href = "../login.html" : console.log("bienvenido")
}
document.addEventListener("DOMContentLoaded",init)

// Info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');



const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};



const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (!value)
        return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState);
    task.textContent = value;
    tasksContainer.prepend(task);
    event.target.reset();
    localStorage.setItem("task",JSON.stringify(value));
    Swal.fire({
        position: `button`,
        title: 'Exito',
        text: 'Tarea agregada',
        icon: 'success',
        confirmButtonText: 'ok',
        timer: 3000

      })

}



localStorage.setItem("task", "text")

const changeTaskState = event => {
    event.target.classList.toggle('done');
};


const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}

setDate();

//-------------------BOTON SWITCH-------------------------
const btnswitch = document.querySelector(`#switch`);

btnswitch.addEventListener(`click`, () => {
    document.body.classList.toggle(`dark`);
    btnswitch.classList.toggle(`active`);

    //-------------------LOCALSTORAGE------------------------
    if (document.body.classList.contains(`dark`)) {
        localStorage.setItem(`dark-mode`, `true`);
    } else {
        localStorage.setItem(`dark-mode`, `false`);
    }
});

//----------------OBTENEMOS EL MODO ACTUAL------------------
if (localStorage.getItem(`dark-mode`) === `true`) {
    document.body.classList.add(`dark`);
    btnswitch.classList.add(`active`);
} else {
    document.body.classList.remove(`dark`);
    btnswitch.classList.remove(`active`);
}



