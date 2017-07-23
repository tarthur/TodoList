import { ToDoListItem } from "./ToDoListItem.js";

const defaultOptions = {
    listTitle: 'Todo List name',
    inputPlaceholder: 'What needs to be done?...'
};

const listItemTemplate = `
    <div class="todo-title-wrap">
        <input type="text" class="todo-title readonly" readonly>
        <button class="todo-form__delete-todo-list"></button>
    </div>
    <form class="todo-form">
        <input class="todo-form__input" type="text">
        <button class="todo-form__btn"></button>
    </form>
    <div class="additional-functions">
        <input class="todo-form__checkbox" type="checkbox">
        <button class="todo-form__delete-btn"></button>
    </div> 
    <ul class="todo__items-box"></ul>

`;

/**
 * @param {string} value
 * @param {object} state
 */
export class ToDoList {
    constructor(value, state) {
        this.options = defaultOptions;
        this.state = state || {};
        this.state = {
            isListEmpty: true,
            listTitle: value || this.options.listTitle,
            checkbox: false,
            inputPlaceholder: this.options.inputPlaceholder
        }
        this.state = Object.assign({}, this.state, state); // merge with new state
        this.listItems = [];

        this.todoBox = document.createElement('div');
        this.todoBox.innerHTML = listItemTemplate;
        this.form = this.todoBox.querySelector('.todo-form');
        this.listTitle = this.todoBox.querySelector('.todo-title');
        this.checkbox = this.todoBox.querySelector('.todo-form__checkbox');
        this.formButton = this.todoBox.querySelector('.todo-form__btn');
        this.formInput = this.todoBox.querySelector('.todo-form__input');
        this.formDeleteAllButton = this.todoBox.querySelector('.todo-form__delete-btn');
        this.itemsBox = this.todoBox.querySelector('.todo__items-box');
        this.additionalFunctions = this.todoBox.querySelector('.additional-functions');
        this.deleteTodoListButton = this.todoBox.querySelector('.todo-form__delete-todo-list');
        this.clickDeleteTodoListEvent;
        this.updateStorageEvent;

        this.init();
    }

    init() {
        this.todoBox.classList.add('todo');
        this.setState();
        this.initEvents();
    }

    setState() {
        this.checkbox.checked = this.state.checkbox;
        this.listTitle.value = this.state.listTitle;
        this.formInput.placeholder = this.state.inputPlaceholder;
    }

    initEvents() {
        this.formButton.addEventListener('click', (e) => { this.onClickButtonForm(e) });
        this.checkbox.addEventListener('click', (e) => { this.onClickСheckboxForm(e) });
        this.deleteTodoListButton.addEventListener('click', (e) => { this.onClickDeleteTodoList(e) });
        this.formDeleteAllButton.addEventListener('click', (e) => { this.onClickDeleteAllButton(e) });
        this.listTitle.addEventListener('input', this.onInputListTitle.bind(this));
        this.listTitle.addEventListener('dblclick', this.onDblclickListTitle.bind(this.listTitle));
        this.listTitle.addEventListener('blur', this.onBlurListTitle.bind(this.listTitle));
        this.listTitle.addEventListener('keydown', this.onKeydownListTitle.bind(this.listTitle));
    }

    // Events

    onClickСheckboxForm() {
        let checkboxStete = !this.state.checkbox ? false : true;

        this.listItems.forEach(item => {
            item.state.checkbox = checkboxStete;
            item.onClickCheckbox();
        })

        this.state.checkbox = this.checkbox.checked;
        this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
    }

    onKeydownListTitle(e) {
        if (e.keyCode === 13) { this.blur(); }
    }

    onBlurListTitle(e) {
        this.readOnly = true;
        this.classList.add('readonly')
    }

    onInputListTitle(e) {
        this.state.listTitle = this.listTitle.value;
        this.createrCustomEvents('listOnInputListTitle', { state: this.state }, this.listTitle);
        this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
    }

    onDblclickListTitle(e) {
        this.readOnly = false;
        this.classList.remove('readonly');
        this.select();
    }

    onClickDeleteTodoList() {
        if (!this.clickDeleteTodoListEvent) { this.customEventClickDeleteTodoList() }
        this.todoBox.dispatchEvent(this.clickDeleteTodoListEvent);
        this.todoBox.remove();
        this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
    }

    onClickDeleteAllButton(e) {
        e.preventDefault();

        if (!this.isEmptyArray()) {
            this.listItems = [];
            this.itemsBox.innerHTML = '';

            this.isListEmpty = false;
            this.createrCustomEvents('onDeleteAllItems', { state: this.state }, this.todoBox);
            this.showAdditionalFunctions();
            this.checkbox.checked = false;
        }

        this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
    }

    onClickButtonForm(e) {
        e.preventDefault();

        if (this.isEmptyInput()) {
            return alert('Введите текст');
        }

        this.initTodoItem(this.getInputValue());
    }

    // custom Event

    customEventClickDeleteTodoList() {
        this.clickDeleteTodoListEvent = new CustomEvent('onClickDeleteTodoList', {
            bubbles: true,
            detail: { elem: this }
        });
    }

    customEventUpdateStorage(objElement, dispatchElement) {
        objElement = new CustomEvent('updateStorage', {
            bubbles: true,
            detail: { state: this.state }
        });

        dispatchElement.dispatchEvent(objElement);
    }

    // ***

    createTodoItem(value, options) {
        const item = new ToDoListItem(value, options);
        item.getListItem().addEventListener('ToDoListItem.todoItemClickCloseIcon', this.onClickCloseIconTodoItem.bind(this, item));

        return item;
    }

    onClickCloseIconTodoItem(item, e) {
        this.listItems.forEach((arrayItem, i) => {
            if (arrayItem === item) {
                return this.listItems.splice(i, 1);
            }
        });

        this.showAdditionalFunctions();
        this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
    }

    createrCustomEvents(nameEvent, detailParams, dispatchElement) {
        let updateTitle = new CustomEvent(nameEvent, {
            bubbles: true,
            detail: detailParams
        });

        dispatchElement.dispatchEvent(updateTitle);
    }

    initTodoItem(value, options) {
        const item = this.createTodoItem(value, options);
        this.addTodoItem(item);
        this.showAdditionalFunctions();
        this.itemsBox.scrollTop = this.itemsBox.scrollHeight;
    }

    addTodoItem(item) {
        this.listItems.push(item);
        this.itemsBox.appendChild(item.getListItem());

        this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
    }

    showAdditionalFunctions() {
        if (this.listItems.length > 0) {
            this.additionalFunctions.classList.add('visible');
        } else {
            this.additionalFunctions.classList.remove('visible');
        }
    }

    getInputValue() { return this.formInput.value; }
    isEmptyInput() { return this.getInputValue() === ''; }
    isEmptyArray() { return this.listItems.length === 0; }
    getTodoList() { return this.todoBox; }
    getVisible() { this.todoBox.classList.add('visible'); }
}