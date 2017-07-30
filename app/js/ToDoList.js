import { ToDoListItem } from "./ToDoListItem.js";

const defaultOptions = {
    listTitle: 'Todo list title',
    inputPlaceholder: 'What needs to be done?...'
};

const listItemTemplate = `
    <div class="todo-list__title-wrap">
        <input class="todo-list__title" type="text" readonly" readonly>
        <button class="todo-list__delete-todo-list"></button>
    </div>
    <ul class="todo-list__todo-list-items"></ul>
    <form class="todo-list__form">
        <input class="todo-list__form-input" type="text">
        <button class="todo-list__form-delete-btn"></button>
    </form>
`;

/**
 * @param {string} valueValue
 */
export class ToDoList {
    constructor(valueValue = '', options = {}) {
        this.todoList = document.createElement('div');
        this.todoList.innerHTML = listItemTemplate;
        // find html elements
        this.todoListTitle = this.todoList.querySelector('.todo-list__title');
        this.todoListDeleteBtn = this.todoList.querySelector('.todo-list__delete-todo-list');
        this.todoListItems = this.todoList.querySelector('.todo-list__todo-list-items');
        this.form = this.todoList.querySelector('.todo-list__form');
        this.formInput = this.todoList.querySelector('.todo-list__form-input');
        this.formDeleteAllButton = this.todoList.querySelector('.todo-list__form-delete-btn');
        // options
        this.options = Object.assign({}, defaultOptions, options); // merge options
        //state
        this.todolistTextTitle = valueValue || this.options.listTitle;
        this.inputTextPlaceholder = this.options.inputPlaceholder;
        // events
        this.clickDeleteTodoListEvent;
        this.updateStorageEvent;
        // obj variables
        this.isListEmpty = true;
        this.listItems = [];

        this.init();
    }

    init() {
        this.todoList.classList.add('todo-list');
        // set state
        this.todoListTitle.value = this.todolistTextTitle;
        this.formInput.placeholder = this.inputTextPlaceholder;
        
        this.initEvents();
    }

    initEvents() {
        this.todoListDeleteBtn.addEventListener('click', this.onClickDeleteTodoList.bind(this));
        this.formDeleteAllButton.addEventListener('click', this.onClickDeleteAllButton.bind(this));
        this.formInput.addEventListener('input', this.onClickButtonForm.bind(this));
        this.listTitleEvents();
    }

    listTitleEvents() {
        this.todoListTitle.addEventListener('input', this.onInputListTitle.bind(this));
        this.todoListTitle.addEventListener('dblclick', this.onDblclickListTitle.bind(this.todoListTitle));
        this.todoListTitle.addEventListener('blur', this.onBlurListTitle.bind(this));
        this.todoListTitle.addEventListener('keydown', this.onKeydownListTitle.bind(this.todoListTitle));
    }

    onKeydownListTitle(e) {
        if (e.keyCode === 13) { this.blur(); }
    }

    onBlurListTitle(e) {
        this.todoListTitle.readOnly = true;
        this.todoListTitle.classList.add('readonly')
        this.todolistTextTitle = this.todoListTitle.value;
        this.customEventUpdateStorage(this.updateStorageEvent, this.todoList);
    }

    onInputListTitle(e) {
        this.todolistTitle = this.todoListTitle.value;
        this.createrCustomEvents('listOnInputListTitle', { state: this.state }, this.todoListTitle);
    }

    onDblclickListTitle(e) {
        this.readOnly = false;
        this.classList.remove('readonly');
        this.select();
    }

    onClickDeleteTodoList() {
        if (!this.clickDeleteTodoListEvent) { this.customEventClickDeleteTodoList() }
        this.todoList.dispatchEvent(this.clickDeleteTodoListEvent);
        this.todoList.remove();
        this.customEventUpdateStorage(this.updateStorageEvent, this.todoList);
    }

    onClickDeleteAllButton(e) {
        e.preventDefault();

        if (!this.isEmptyArray()) {
            this.listItems = [];
            this.todoListItems.innerHTML = '';

            this.isListEmpty = false;
            this.createrCustomEvents('ToDoList.onDeleteAllItems', { state: this.state }, this.todoList);
        }
    }

    onClickButtonForm(e) {
        this.initTodoItem(this.getInputValue());
    }

    customEventClickDeleteTodoList() {
        this.clickDeleteTodoListEvent = new CustomEvent('onClickDeleteTodoList', {
            bubbles: true,
            detail: { elem: this }
        });
    }

    customEventUpdateStorage(objElement, dispatchElement) {
        objElement = new CustomEvent('updateStorage', {
            bubbles: true,
            detail: { state: 2 }
        });

        dispatchElement.dispatchEvent(objElement);
    }

    createTodoItem(valueValue, checkboxChecked) {
        const item = new ToDoListItem(valueValue, checkboxChecked);
        item.getListItem().addEventListener('ToDoListItem.todoItemClickCloseIcon', this.onClickCloseIconTodoItem.bind(this, item));

        return item;
    }

    onClickCloseIconTodoItem(item, e) {
        this.listItems.forEach((arrayItem, i) => {
            if (arrayItem === item) {
                return this.listItems.splice(i, 1);
            }
        });
    }

    createrCustomEvents(nameEvent, detailParams, dispatchElement) {
        let updateTitle = new CustomEvent(nameEvent, {
            bubbles: true,
            detail: detailParams
        });

        dispatchElement.dispatchEvent(updateTitle);
    }

    initTodoItem(valueValue, checkboxChecked) {
        const item = this.createTodoItem(valueValue, checkboxChecked);
        this.addTodoItem(item);
        this.todoListItems.scrollTop = this.todoListItems.scrollHeight;
        item.input.focus()
        this.formInput.value = '';
    }

    addTodoItem(item) {
        this.listItems.push(item);
        this.todoListItems.appendChild(item.getListItem());

        this.customEventUpdateStorage(this.updateStorageEvent, this.todoList);
    }

    getInputValue() { return this.formInput.value; }
    isEmptyInput() { return this.getInputValue() === ''; }
    isEmptyArray() { return this.listItems.length === 0; }
    getTodoList() { return this.todoList; }
    getVisible() { this.todoList.classList.add('visible'); }
}