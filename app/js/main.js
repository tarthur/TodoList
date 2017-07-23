import { ToDoBuilder } from "./ToDoBuilder.js";


let todoBuilderInitial = document.getElementById('todo-builder__initial');
let todoBuilderreturned = document.getElementById('todo-builder__lists-container');

let todoBuilder = new ToDoBuilder(todoBuilderInitial, todoBuilderreturned);