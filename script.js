
const getElement =(element) => document.querySelector(element)
const getAllElement =(element) => document.querySelectorAll(element)


const input = getElement(".input")
const btn = getElement(".add-btn")
const list = getElement(".list")
const doneList = getElement(".done-list")

const  classes = {
    li: "todo-item list-group-item d-flex justify-content-between align-items-center",
    delBtn: "del-btn btn btn-info mx-1",
    updBtn: "update-btn btn btn-success mx-1",
    saveBtn: "save-btn btn btn-warning mx-1",
    cancelBtn: "cancel-btn btn btn-secondary mx-1"
}

btn.addEventListener("click", () =>{

    if (input.value.trim() && input.value.length > 3){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []
        const newObject ={
            id: + new Date(),
            title:input.value,
            isDone: false
        }
        tasks =[... tasks, newObject]
        localStorage.setItem("tasks", JSON.stringify(tasks))

        input.value = ""
        const randomIdx = Math.floor(Math.random() * colors.length)
        const color = colors[randomIdx]
        view()
    }
})
view()

function view () {

    let result = ""
    let tasks = JSON.parse(localStorage.getItem("tasks",)) || []

    tasks.filter(el => el.isDone === false).forEach(({title, id, isDone}, idx) => {
        const initials = title.split(" ").slice(0, 2)
            .reduce((acc, el) => acc + el[0].toUpperCase(), "")

        result += `<li class="${classes.li}">
       <div class="d-flex align-items-centre">
       <div
        style="background: green"
        class="profile me-2
        
">
    ${initials}
</div>
        <span class="title">${title[0].toUpperCase() + title.slice(1)}</span>
        <input type="text" class="rename-input" value="${title}" style="display:none">
        </div>
        <span class="d-flex"
         <input type="checkbox" id="${id}" class="check-todo">
         <button id="${id}" style= "display:none" class="${classes.saveBtn}"><i class="fa-solid fa-check"></i></button>
          <button class="${classes.updBtn}"><i class="fa-solid fa-pencil"></i></button>
          <button class="${classes.delBtn}"><i class="fa-solid fa-xmark"></i></button>
          <button class="${classes.cancelBtn}" style= "display:none"><i class="fa-solid fa-arrow-left-long"></i></button>
          </span>
          </li>`
    })

    list.innerHTML = result
    deleteTodo()
    checkTodo()
    updateTodo()
}

function deleteTodo(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const delButtons = getAllElement(".del-btn")
   delButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () =>{
            let updatedTasks = tasks.filter((el, index) => index !== idx)
                localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            view()
        })
    })
}

function checkTodo() {
    const checkBoxes = getAllElement(".check-todo")
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    checkBoxes.forEach((check,idx) =>{
        check.addEventListener("change", () =>{
            const id = check.getAttribute("id")
            tasks = tasks.map(el =>{
                if (el.id === +id) {
                    return {...el, isDone: !el.isDone}
                } else{
                    return  el
                }
            })
            console.log("tasks", tasks.filter(el => !el.isDone))
            localStorage.setItem("tasks", JSON.stringify(tasks))
            renderDone()
            view()
        })
    })
}

function renderDone(){
    let result = ""
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.filter(el => el.isDone).forEach(({title, id, isDone}, idx) =>{
        const initials = title.split(" ").slice(0, 2)
            .reduce((acc, el) => acc + el[0].toUpperCase(), "")

        result += `<li class="${classes.li}">
         <div class="d-flex align-items-centre">
       <div
        style="background: green"
        class="profile me-2
        
">
    ${initials}
</div>
      <span class="text-decoration-line-through"> ${title[0].toUpperCase() + title.slice(1)}</span>
      </div>
      <span>
      <input id="${id}" type="checkbox" checked class="check-todo">
      
      <button class="${classes.updBtn}"><i class="fa-solid fa-pencil"></i></button>
      <button class="${classes.delBtn}"><i class="fa-solid fa-xmark"></i></button>
</span>
        </li>`
        doneList.innerHTML = result

        checkTodo()
        view()
    })
}


function updateTodo() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const updateButtons = getAllElement(".update-btn")
    const renameInputs = getAllElement(".rename-input")
    const titles = getAllElement(".title")
    const saveButtons = getAllElement(".save-btn")
    const cancelButtons = getAllElement(".cancel-btn")
    const delButtons = getAllElement(".del-btn")
    updateButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            renameInputs[idx].style.display = "block"
            saveButtons[idx].style.display = "block"
            cancelButtons[idx].style.display = "block"
            updateButtons[idx].style.display = "none"
            delButtons[idx].style.display = "none"
            titles[idx].style.display = "none"
        })
    })
    saveButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            renameInputs[idx].style.display = "none"
            saveButtons[idx].style.display = "none"
            updateButtons[idx].style.display = "block"
            titles[idx].style.display = "block"
            const id = saveButtons[idx].getAttribute("id")
            const updatedTasks = tasks.map((el, i) => {
                if (el.id === +id) {
                    return {...el, title: renameInputs[idx].value}
                } else return el
            })
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            view()
        })
    })
    cancelButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            renameInputs[idx].style.display = "none"
            saveButtons[idx].style.display = "none"
            cancelButtons[idx].style.display = "none"
            updateButtons[idx].style.display = "block"
            delButtons[idx].style.display = "block"
            titles[idx].style.display = "block"
        })
    })
}

