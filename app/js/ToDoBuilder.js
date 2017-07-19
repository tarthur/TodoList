import { ToDoList } from "./ToDoList.js";


/**
 * @param {HTMLButtonElement} btn
 */
export class ToDoBuilder {
    constructor(btn) {
        this.btn = btn;
        this.result = document.getElementById('result');

        this.init();
    }

    init() {
        this.addTodoList();
        this.btn.addEventListener('click', (e) => { this.onClickBtn(e) });
    }

    onClickBtn(e) {
        this.addTodoList()
    }

    addTodoList() {
        let todoList = new ToDoList();
        this.result.appendChild( todoList.getTodoList() );
        setTimeout(() => { todoList.getVisible() }, 10)
    }
}