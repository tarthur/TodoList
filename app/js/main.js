import { ToDoBuilder } from "./ToDoBuilder.js";


let todoListBuilderButtons = document.getElementById('todo-list-builder__buttons');
let todoListContainer = document.getElementById('todo-list-builder__container');

let todoBuilder = new ToDoBuilder(todoListBuilderButtons, todoListContainer);