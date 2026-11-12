
const date = document.getElementById("date");
const formContainer = document.getElementById("formContainer");
const input = document.getElementById("input");
const category = document.getElementById("category");
const message = document.getElementById("message");
const todoList = document.getElementById("todo-list");
const priority = document.getElementById("priority")

let todos = JSON.parse(localStorage.getItem("todo")) || [];

function storeData() {
    localStorage.setItem("todo", JSON.stringify(todos));
}

const datenow = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric"  
})
date.textContent = datenow;
date.classList.add("date");

let selectedCategory = "";
const categories = ["Work", "Personal", "Health", "Learning"];

for(let i = 0; i < categories.length; i++) {
    const span = document.createElement("span")
    span.classList.add(categories[i].toLowerCase(), "eachCategory")
    span.textContent = categories[i]
    category.append(span)
    console.log(span)

    span.addEventListener("click", () => {
        selectedCategory = categories[i]
        document.querySelectorAll(".eachCategory").forEach(item => item.classList.remove("selected"))
        if(selectedCategory === categories[i]) {
            span.classList.add("selected")
        } else {
            span.classList.remove("selected")
        }
    })
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("todo");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;

        checkbox.addEventListener("click", () => {
            item.completed = checkbox.checked;

            renderTodos();
            storeData();
        });

         const p = document.createElement("p");
         p.classList.add("text");
         p.textContent = item.text;

         if(item.completed) {
            p.classList.add("completed");
        }

        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.textContent = item.category;

        const priorityElement = document.createElement("span");
        priorityElement.textContent = "Priority";
        priorityElement.classList.add("priority-high");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";

        editBtn.addEventListener("click", () => {
        const newText = prompt("Edit your task:", item.text);

            if (newText !== null && newText.trim() !== "") {
                item.text = newText.trim();
                renderTodos();
                storeData();
            }
        });

        deleteBtn.addEventListener("click", () => {
            todos = todos.filter(todo => todo.id !== item.id);

            renderTodos();
            storeData();
        });

        if (item.highPriority) {
            div.append(checkbox, p, tag, priorityElement, editBtn, deleteBtn);
        } else {
            div.append(checkbox, p, tag, editBtn, deleteBtn);
        }

        todoList.append(div);
    });
}renderTodos();




formContainer.addEventListener("submit", (e) => {
    e.preventDefault()

   const userInput = input.value.trim()
   
   if(userInput === "") {
    message.textContent = "❗please input your message"
    message.classList.add("error-message")
    message.style.fontSize = "14px"
    return;
   } else {
    message.textContent = ""
   }

   if(selectedCategory === "") {
    message.textContent = "❗please select a category"
    message.classList.add("error-message")
    message.style.fontSize = "14px"
    return
   } else {
        message.textContent = ""
   }

   let todo = {
    id: Date.now(),
    text: userInput,
    category: selectedCategory,
    completed: false,
    highPriority: priority.checked
   }

   todos.push(todo)
   console.log(todos)
   renderTodos()


   storeData()
   input.value = ""
   selectedCategory = ""
   message.textContent = ""
   priority.checked = false
}); 
renderTodos();
