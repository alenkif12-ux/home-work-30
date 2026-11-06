const API_URL = "https://6aedbd3ea677fe0fc14f4cee.mockapi.io/ToDos";

const input = document.querySelector("#todoInput");
const addButton = document.querySelector("#addButton");
const getButton = document.querySelector("#getButton");
const listElement = document.querySelector("#todoList");

const createTodoList = (todos) => {
  listElement.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = `<li>ID: ${todo.id}, NAME: ${todo.name} 
    <button class="delete-btn" data-id="${todo.id}">❌</button></li>`;
    listElement.insertAdjacentHTML("beforeend", todoElement);
  });
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      deleteTodo(id);
      });
});
};



const getTodos = async() => {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        createTodoList(todos);
    } catch (error) {
        console.error("Помилка при отриманні:", error);
    }
};

const addTodo = async (todoText) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ name: todoText }), 
    });
    const data = await response.json();
    console.log("Успішно додано:", data);
    getTodos();
    
  } catch (error) {
    console.error("Помилка POST:", error);
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      });
    
    await response.json();
    console.log(`Елемент з ID ${id} видалено`);
    getTodos();
    } catch (error) {
    console.error("Помилка DELETE:", error);
  }
};

getButton.addEventListener("click", getTodos);

addButton.addEventListener("click", () => {
  const text = input.value;
  if (text.trim() !== "") {
    addTodo(text);
    input.value = "";
    }
});