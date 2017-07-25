import { ToDoList } from "./ToDoList.js";


const toDoBuilderTemplate = `
    <button class="todo-builder__add-btn">Add new list</button>
    <button class="todo-builder__clear-btn">Clear</button>
`;

/**
 * @param {HTMLBlockElement} initialElement
 * @param {HTMLBlockElement} resultBox
 */
export class ToDoBuilder {
    constructor(initialElement, resultBox) {
        this.todoBuilder = initialElement;
        this.todoBuilder.innerHTML = toDoBuilderTemplate;
        this.addBtn = this.todoBuilder.querySelector('.todo-builder__add-btn');
        this.clearBtn = this.todoBuilder.querySelector('.todo-builder__clear-btn');
        this.resultBox = resultBox;
        this.todoListArray = [];
        this.localStorageArray = null;

        this.init();
    }

    init() {
        let storage = localStorage.getItem('todolist');

        if (storage && storage !== '[]') {
            storage = JSON.parse(storage);
            this.buildFromLocalStorage(storage);
        } else {
            this.addTodoList();
        }

        this.initEvents();
    }

    initEvents() {
        this.addBtn.addEventListener('click', this.onClickAddBtn.bind(this));
        this.clearBtn.addEventListener('click', this.onClickClearBtn.bind(this));
        this.resultBox.addEventListener('onClickDeleteTodoList', this.onClickDeleteTodoList.bind(this));
        this.resultBox.addEventListener('updateStorage', this.updateLocalStorage.bind(this));

        this.resultBox.addEventListener('ToDoListItem.todoItemClickCloseIcon', this.updateLocalStorage.bind(this, 'changeStructure'));
        this.todoBuilder.addEventListener('ToDoBuilder.addTodoListEvent', this.updateLocalStorage.bind(this, 'changeStructure'));
        this.todoBuilder.addEventListener('ToDoBuilder.addTodoListEvent', this.updateLocalStorage.bind(this, 'changeStructure'));
    }


    buildFromLocalStorage(storage) {
        this.todoListArray = [];
        this.resultBox.innerHTML = '';

        storage.forEach((tList) => {
            let toDoList = tList.todoList;
            let toDoListArr = tList.totoListArr;
            let list = new ToDoList(toDoList.todolistTitle, toDoList.checkboxChecked);

            this.todoListArray.push(list);
            this.getVisibleClearBtn();

            toDoListArr.forEach(toDoListItem => {
                list.initTodoItem(toDoListItem.valueValue, toDoListItem.checkboxChecked);
            });

            this.resultBox.appendChild(list.getTodoList());
            list.getVisible()
        });
    }

    updateLocalStorage(structure) {
        if (structure === 'changeStructure' || this.localStorageArray === null) {
            this.localStorageArray = this.todoListArray.map(totoList => {
                return {
                    'todoList': totoList,
                    'totoListArr': totoList.listItems
                };
            });
        }

        const newData = JSON.stringify(this.localStorageArray);
        localStorage.setItem('todolist', newData);
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
        this.clear();
        this.getVisibleClearBtn();
        this.addTodoList();
        this.updateLocalStorage('changeStructure');
    }

    onClickAddBtn(e) {
        this.addTodoList()
        this.customEventAddTodoListEvent();
        this.updateLocalStorage();
        this.getVisibleClearBtn();
    }

    addTodoList() {
        let todoList = new ToDoList();
        this.todoListArray.push(todoList);
        this.resultBox.appendChild(todoList.getTodoList());
        setTimeout(() => { todoList.getVisible() }, 10)
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

    isEmptyArray() { return this.todoListArray.length === 0; }
}