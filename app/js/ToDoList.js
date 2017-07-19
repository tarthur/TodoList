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
    constructor() {
        this.todoBox = document.createElement('div');
        this.form = document.createElement('form');
        this.formInput = document.createElement('input');
        this.formButton = document.createElement('button');
        this.formDeleteAllButton = document.createElement('button');
        this.itemsBox = document.createElement('ul');
        this.listItems = [];

        this.init();
    }

    init() {
        this.todoBox.classList.add('todo');

        this.form.classList.add('todo-form');
        this.formInput.classList.add('todo-form__input');
        this.formInput.type = 'text';
        this.formInput.placeholder = 'What needs to be done?...';
        this.formButton.classList.add('todo-form__btn');
        this.formDeleteAllButton.classList.add('todo-form__delete-btn')
        this.formDeleteAllButton.innerHTML = 'Delete All';

        this.itemsBox.classList.add('todo__items-box');

        this.form.appendChild(this.formDeleteAllButton);
        this.form.appendChild(this.formInput);
        this.form.appendChild(this.formButton);
        this.todoBox.appendChild(this.form);
        this.todoBox.appendChild(this.itemsBox);

        this.initEvents();
    }

    initEvents() {
        this.formButton.addEventListener('click', (e) => { this.onClickButtonForm(e) });
        this.formDeleteAllButton.addEventListener('click', (e) => { this.onClickDeleteAllButton(e) });
    }

    onClickDeleteAllButton(e) {
        e.preventDefault();

        if (!this.isEmptyArray()) {
            let l = this.listItems.length;

            for (let i = (l - 1); i >= 0; i--) {
                this.listItems[i].onClickCloseIcon(null, this.listItems[i].itemBox);
            }
        }
    }

    onClickButtonForm(e) {
        e.preventDefault();

        if (this.isEmptyInput()) {
            return alert('Введите текст');
        }
        
        this.addTodoItem();
    }

    addTodoItem() {
        const item = this.createTodoItem();

        this.listItems.push(item);
        this.itemsBox.appendChild(item.itemBox);
    }

    createTodoItem(value) {
        const item = new ToDoListItem(this.getInputValue());
        item.itemBox.addEventListener('changeTodoItemState', (e) => { this.onChangedTodoState(e, item) });

        return item;
    }

    onChangedTodoState(e, item) {
        switch (e.detail.action) {
            case 'finished':
                this.finishedItem(e, item);
                break;
            case 'changed':
                this.changedItem(e, item);
                break;
            case 'deleted':
                this.deleteItem(e, item);
                break;
        }
    }

    deleteItem(e, item) {
        this.listItems.forEach((arrayItem, i) => {
            if (arrayItem === item) {
                return this.listItems.splice(i, 1);
            }
        })
    }

    changedItem(e, item) {
        console.log(`finishedItem. ToDoListItem.state: ${item.state.input}`);
    }

    finishedItem(e, item) {
        console.log(`finishedItem. ToDoListItem.state: ${item.state.checkbox}`);
    }

    getInputValue() {
        return this.formInput.value;
    }

    isEmptyInput() {
        return this.getInputValue() === '';
    }

    isEmptyArray() {
        return this.listItems.length === 0;
    }

    getTodoList() {
        return this.todoBox;
    }

    getVisible() {
        this.todoBox.classList.add('visible');
    }
}