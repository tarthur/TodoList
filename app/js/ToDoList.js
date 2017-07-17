import { ToDoListItem } from "./ToDoListItem.js";

/**
 * @param {HTML any block blement} todoBox
 * @param {HTMLFormElement} form
 * @param {HTMLInputElement} formInput
 * @param {HTMLButtonElement} formButton
 * @param {HTMLULElement} itemsBox
 * @param {Array} itemsBox
 */
export class ToDoList {
    constructor(rootElement) {
        this.todoBox = rootElement;
        this.form = this.todoBox.querySelector('.todo-form');
        this.formInput = this.todoBox.querySelector('.todo-form__input');
        this.formButton = this.todoBox.querySelector('.todo-form__btn');
        this.itemsBox = document.createElement('ul');
        this.listItems = [];

        this.init();
    }

    init() {
        this.todoBox.classList.add('todo');
        this.itemsBox.classList.add('todo__items-box');
        this.todoBox.appendChild(this.itemsBox);

        this.formButton.addEventListener('click', (e) => { this.onClickButtonForm(e) });
    }

    onClickButtonForm(e) {
        e.preventDefault()

        if (this.isEmptyInput()) {
            return alert('Введите текст');
        }

        if (this.isIdenticalItem(this.getInputValue())) {
            return alert('Такая задача уже есть');
        }

        this.addTodoItem();
    }

    addTodoItem() {
        const elem = this.createTodoItem();
        this.listItems.push(elem);
        this.itemsBox.appendChild(elem.itemBox);
    }

    createTodoItem(value) {
        let currentItemState = new ToDoListItem(this.getInputValue()).getState();
        currentItemState.itemBox.addEventListener('changeTodoItemState', (e) => { this.onChangedTodoState(e) });
        return currentItemState;
    }

    onChangedTodoState(e) {
        switch (e.detail.act) {
            case 'finished':
                this.finishedItem(e);
                break;
            case 'changed':
                this.changedItem(e);
                break;
            case 'deleted':
                this.deleteItem(e);
                break;
        }
    }

    deleteItem(e) {
        this.listItems.forEach((item, i) => {
            if (item === e.detail.state) {
                return this.listItems.splice(i, 1);
            }
        })
    }

    changedItem(e) {
        console.log('changedItem');
    }
    
    finishedItem(e) {
        console.log('finishedItem');
    }

    getInputValue() {
        return this.formInput.value;
    }

    isEmptyInput() {
        return this.getInputValue() === '';
    }

    isIdenticalItem(value) {
        for (let i = 0; i < this.listItems.length; i++) {
            if (this.listItems[i].input === value) return true;
        }

    }
}