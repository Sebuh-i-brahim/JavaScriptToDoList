// Select All ELements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const cardBodies = document.querySelectorAll(".card-body");
const firstCB = cardBodies[0];
const secondCB = cardBodies[1];
const filter = document.querySelector("#filter");
const clearBTN = document.querySelector("#clear-todos");


eventListenerAll();

// All event listeners
function eventListenerAll()
{
	form.addEventListener("submit", addTodo);
	document.addEventListener("DOMContentLoaded", loadAllTodos);
	secondCB.addEventListener("click", deleteItems);
}

filter.onkeyup = () => {
	const value = filter.value.toLowerCase();
	const list = document.querySelectorAll(".list-group-item");
	list.forEach((item, index) => {
		const text = item.textContent.toLowerCase();
		if (text.indexOf(value) === -1) {
			item.setAttribute("style", "display: none !important");
		}else{
			item.setAttribute("style", "display: block");
		}
	});
};

clearBTN.onclick = () => {
	if(confirm("If you want to delete all list?")){
		while(todoList.firstElementChild != null){
			todoList.removeChild(todoList.firstElementChild);
		}
		localStorage.removeItem("todo_list");
	}
	checkStorage();
};

function addTodo(e)
{
	const newTodo = todoInput.value.trim();
	if (newTodo === "") {
		showAlert("danger", "Please Insert Todo");
	}else{
		addTodoToUI(newTodo);
		addStorage(newTodo);
		showAlert("success", "Todo inserted successfuly")	
	}
	checkStorage();
	e.preventDefault();
}

function addTodoToUI(todo)
{
	// Create <li> element
	const listItem = document.createElement("li");
	listItem.className = "list-group-item d-flex justify-content-between";
	
	// Create <a> element
	const link = document.createElement("a");
	link.href = "#";
	link.className = "delete-item";
	link.innerHTML = "<i class='fa fa-remove'></i>";

	// Text Node creating
	listItem.appendChild(document.createTextNode(todo));
	// <a> adding to <li>
	listItem.appendChild(link);

	// listItem adding todoList

	todoList.appendChild(listItem);
	todoInput.value = "";
	checkStorage();
}

function showAlert(type, message)
{
	const alert = document.createElement("div");
	const oldAlert = document.querySelector(".alert");
	if(oldAlert !== null){
		oldAlert.remove();
	}
	alert.className = `alert alert-${type}`;
	alert.textContent = message;
	firstCB.appendChild(alert);
	setTimeout(() => {
		alert.remove();
	}, 10000);
}

function getAllTodos()
{
	let todos = (localStorage.getItem("todo_list"))? JSON.parse(localStorage.getItem("todo_list")) : [];
	return todos;
}

function checkStorage()
{
	let todos = (localStorage.getItem("todo_list"))? JSON.parse(localStorage.getItem("todo_list")) : [];
	if (todos.length > 0) {
		clearBTN.classList.remove("disabled");
		filter.readOnly = false;
	}else{
		clearBTN.classList.add("disabled");
		filter.readOnly = true;
	}
}

function addStorage(todo)
{
	let todos = getAllTodos();
	todos.push(todo);
	localStorage.setItem("todo_list", JSON.stringify(todos));
}

function loadAllTodos()
{
	let todos = getAllTodos();
	if (todos.length > 0) {
		todos.forEach((todo)=>{
			addTodoToUI(todo);
		});
	}
	checkStorage();
}

function deleteItems(e)
{
	if (e.target.className === "fa fa-remove") {
		e.target.parentElement.parentElement.remove();
		deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
		showAlert("success", "Todo removed Succesfuly");
	}
	checkStorage();
}

function deleteTodoFromStorage(delTodo)
{
	let todos = getAllTodos();
	todos.forEach((todo,index) => {
		if (todo === delTodo) {
			todos.splice(index, 1);
		}
	});
	localStorage.setItem("todo_list", JSON.stringify(todos));
}