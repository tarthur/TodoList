import { ToDoList } from "./ToDoList.js";


/**
 * @param {HTMLBlockElement} initialElement
 * @param {HTMLBlockElement} resultBox
 */
export class ToDoBuilder {
    constructor(resultBox) {
        this.addBtn = document.getElementById('todo-list-builder__add-btn');
        this.clearBtn = document.getElementById('todo-list-builder__clear-btn');
        this.resultBox = resultBox;
        this.localStorageArray = null;
        this.todoListArray = [];

        this.init();
    }

    init() {
        this.checkLocalStorage();
        this.initEvents();
        this.initCustomEvents();
        this.oneItem();
    }

    checkLocalStorage() {
        let todoBuilderLocalStorage = localStorage.getItem('todoBuilder');

        if (todoBuilderLocalStorage && todoBuilderLocalStorage !== '[]') {
            todoBuilderLocalStorage = JSON.parse(todoBuilderLocalStorage);
            this.buildFromLocalStorage(todoBuilderLocalStorage);
        } else {
            this.addTodoList();
        }
    }

    initEvents() {
        this.addBtn.addEventListener('click', this.onClickAddBtn.bind(this));
        this.clearBtn.addEventListener('click', this.onClickClearBtn.bind(this));
    }

    initCustomEvents() {
        this.resultBox.addEventListener('onClickDeleteTodoList', this.onClickDeleteTodoList.bind(this));
        this.resultBox.addEventListener('updateStorage', this.updateLocalStorage.bind(this));
        this.resultBox.addEventListener('ToDoListItem.todoItemClickCloseIcon', this.updateLocalStorage.bind(this, 'changeStructure'));
        this.resultBox.addEventListener('ToDoList.onDeleteAllItems', this.updateLocalStorage.bind(this, 'changeStructure'));
        this.resultBox.addEventListener('ToDoBuilder.addTodoListEvent', this.updateLocalStorage.bind(this, 'changeStructure'));
        this.resultBox.addEventListener('ToDoBuilder.addTodoListEvent', this.updateLocalStorage.bind(this, 'changeStructure'));
    }

    buildFromLocalStorage(todoBuilderLocalStorage) {
        this.clearResultBox();

        todoBuilderLocalStorage.forEach(todoListObj => {
            this.buildLocalStorageTodoList(todoListObj);
        });
    }

    buildLocalStorageTodoList(todoListObj) {
        let toDoList = todoListObj.todoList;
        let toDoListItems = todoListObj.totoListArr;

        let newTodoList = new ToDoList(toDoList.todolistTextTitle);

        this.todoListArray.push(newTodoList);
        this.getVisibleClearBtn();

        this.buildLocalStorageTodoListItems(newTodoList, toDoListItems);

        this.resultBox.appendChild(newTodoList.getTodoList());
        newTodoList.getVisible()
    }

    buildLocalStorageTodoListItems(toDoList, toDoListItems) {
        toDoListItems.forEach(toDoListItem => {
            toDoList.initTodoItem(toDoListItem.valueValue, toDoListItem.checkboxChecked);
        });
    }

    clearResultBox() {
        this.todoListArray = [];
        this.resultBox.innerHTML = '';
    }

    updateLocalStorage(structure) {
        this.setLocalStorageData(structure);
        this.oneItem();
    }

    setLocalStorageData(structure) {
        if (structure === 'changeStructure' || this.localStorageArray === null) {
            this.localStorageArray = this.todoListArray.map(totoList => {
                return {
                    'todoList': totoList,
                    'totoListArr': totoList.listItems
                };
            });
        }

        const newData = JSON.stringify(this.localStorageArray);

        localStorage.setItem('todoBuilder', newData);
    }


    onClickDeleteTodoList(e) {
        this.todoListArray.forEach((item, i) => {
            if (e.detail.elem === item) {
                return this.todoListArray.splice(i, 1);
            }
        })

        this.getVisibleClearBtn();
        this.updateLocalStorage('changeStructure');
    }

    onClickClearBtn(e) {
        if (e.target === this.clearBtn) {
            this.clear();
            this.getVisibleClearBtn();
            this.addTodoList();
            this.updateLocalStorage('changeStructure');
        }
    }

    onClickAddBtn(e) {
        this.addTodoList()
        this.customEventAddTodoListEvent();
            this.updateLocalStorage('changeStructure');
        this.getVisibleClearBtn();
    }

    addTodoList() {
        let todoList = new ToDoList();
        this.todoListArray.push(todoList);
        this.resultBox.appendChild(todoList.getTodoList());
        setTimeout(() => { todoList.getVisible() }, 10)
        this.oneItem();
    }

    customEventAddTodoListEvent() {
        event = new CustomEvent("ToDoBuilder.addTodoListEvent", {
            bubbles: true,
            detail: {}
        });

        this.addBtn.dispatchEvent(event);
    }

    clear() {
        this.todoListArray = [];
        this.resultBox.innerHTML = '';
    }

    getVisibleClearBtn() {
        if (this.todoListArray.length > 1) {
            return this.clearBtn.classList.add('visible');
        }

        return this.clearBtn.classList.remove('visible');
    }

    oneItem () {
        if (this.todoListArray.length === 1) {
            this.resultBox.classList.add('one-item');
        } else {
            this.resultBox.classList.remove('one-item');
        }
    }

    isEmptyArray() { return this.todoListArray.length === 0; }
}