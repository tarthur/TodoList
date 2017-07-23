(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToDoBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ToDoList = require('./ToDoList.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var toDoBuilderTemplate = '\n    <button class="todo-builder__add-btn">Add new list</button>\n    <button class="todo-builder__clear-btn">Clear</button>\n';

/**
 * @param {HTMLBlockElement} initialElement
 * @param {HTMLBlockElement} resultBox
 */

var ToDoBuilder = exports.ToDoBuilder = function () {
    function ToDoBuilder(initialElement, resultBox) {
        _classCallCheck(this, ToDoBuilder);

        this.todoBuilder = initialElement;
        this.todoBuilder.innerHTML = toDoBuilderTemplate;
        this.addBtn = this.todoBuilder.querySelector('.todo-builder__add-btn');
        this.clearBtn = this.todoBuilder.querySelector('.todo-builder__clear-btn');
        this.resultBox = resultBox;
        this.todoListArray = [];

        this.init();
    }

    _createClass(ToDoBuilder, [{
        key: 'init',
        value: function init() {
            var storage = localStorage.getItem('todolist');

            if (storage) {
                storage = JSON.parse(storage);
                this.buildFromLocalStorage(storage);
            } else {
                this.addTodoList();
            }

            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            this.addBtn.addEventListener('click', this.onClickAddBtn.bind(this));
            this.clearBtn.addEventListener('click', this.onClickClearBtn.bind(this));
            this.resultBox.addEventListener('onClickDeleteTodoList', this.onClickDeleteTodoList.bind(this));
            this.resultBox.addEventListener('updateStorage', this.updateLocalStorage.bind(this));
        }
    }, {
        key: 'buildFromLocalStorage',
        value: function buildFromLocalStorage(storage) {
            var _this = this;

            this.todoListArray = [];
            this.resultBox.innerHTML = '';

            storage.forEach(function (toDoList) {
                var list = new _ToDoList.ToDoList(null, toDoList.state);

                _this.todoListArray.push(list);
                _this.getVisibleClearBtn();

                toDoList.arr.forEach(function (toDoListItem) {
                    list.initTodoItem(null, toDoListItem.state);
                });

                _this.resultBox.appendChild(list.getTodoList());
                list.getVisible();
            });
        }
    }, {
        key: 'updateLocalStorage',
        value: function updateLocalStorage() {
            if (localStorage.getItem('todolist')) localStorage.removeItem('todolist');

            var newListData = this.todoListArray.map(function (totoList) {
                var obj = {
                    arr: totoList.listItems,
                    state: totoList.state
                };

                return obj;
            });

            var newData = JSON.stringify(newListData);
            localStorage.setItem('todolist', newData);
        }
    }, {
        key: 'onClickDeleteTodoList',
        value: function onClickDeleteTodoList(e) {
            var _this2 = this;

            this.todoListArray.forEach(function (item, i) {
                if (e.detail.elem === item) {
                    return _this2.todoListArray.splice(i, 1);
                }
            });

            this.getVisibleClearBtn();
            this.updateLocalStorage();
        }
    }, {
        key: 'onClickClearBtn',
        value: function onClickClearBtn(e) {
            this.clear();
            this.getVisibleClearBtn();
            this.addTodoList();
            this.updateLocalStorage();
        }
    }, {
        key: 'onClickAddBtn',
        value: function onClickAddBtn(e) {
            this.addTodoList();
            this.updateLocalStorage();
            this.getVisibleClearBtn();
        }
    }, {
        key: 'addTodoList',
        value: function addTodoList() {
            var todoList = new _ToDoList.ToDoList();
            this.todoListArray.push(todoList);
            this.resultBox.appendChild(todoList.getTodoList());
            setTimeout(function () {
                todoList.getVisible();
            }, 10);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.todoListArray = [];
            this.resultBox.innerHTML = '';
        }
    }, {
        key: 'getVisibleClearBtn',
        value: function getVisibleClearBtn() {
            if (this.todoListArray.length > 1) {
                return this.clearBtn.classList.add('visible');
            }

            return this.clearBtn.classList.remove('visible');
        }
    }, {
        key: 'isEmptyArray',
        value: function isEmptyArray() {
            return this.todoListArray.length === 0;
        }
    }]);

    return ToDoBuilder;
}();

},{"./ToDoList.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToDoList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ToDoListItem = require('./ToDoListItem.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
    listTitle: 'Todo List name',
    inputPlaceholder: 'What needs to be done?...'
};

var listItemTemplate = '\n    <div class="todo-title-wrap">\n        <input type="text" class="todo-title readonly" readonly>\n        <button class="todo-form__delete-todo-list"></button>\n    </div>\n    <form class="todo-form">\n        <input class="todo-form__input" type="text">\n        <button class="todo-form__btn"></button>\n    </form>\n    <div class="additional-functions">\n        <input class="todo-form__checkbox" type="checkbox">\n        <button class="todo-form__delete-btn"></button>\n    </div> \n    <ul class="todo__items-box"></ul>\n\n';

/**
 * @param {string} value
 * @param {object} state
 */

var ToDoList = exports.ToDoList = function () {
    function ToDoList(value, state) {
        _classCallCheck(this, ToDoList);

        this.options = defaultOptions;
        this.state = state || {};
        this.state = {
            isListEmpty: true,
            listTitle: value || this.options.listTitle,
            checkbox: false,
            inputPlaceholder: this.options.inputPlaceholder
        };
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

    _createClass(ToDoList, [{
        key: 'init',
        value: function init() {
            this.todoBox.classList.add('todo');
            this.setState();
            this.initEvents();
        }
    }, {
        key: 'setState',
        value: function setState() {
            this.checkbox.checked = this.state.checkbox;
            this.listTitle.value = this.state.listTitle;
            this.formInput.placeholder = this.state.inputPlaceholder;
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var _this = this;

            this.formButton.addEventListener('click', function (e) {
                _this.onClickButtonForm(e);
            });
            this.checkbox.addEventListener('click', function (e) {
                _this.onClickСheckboxForm(e);
            });
            this.deleteTodoListButton.addEventListener('click', function (e) {
                _this.onClickDeleteTodoList(e);
            });
            this.formDeleteAllButton.addEventListener('click', function (e) {
                _this.onClickDeleteAllButton(e);
            });
            this.listTitle.addEventListener('input', this.onInputListTitle.bind(this));
            this.listTitle.addEventListener('dblclick', this.onDblclickListTitle.bind(this.listTitle));
            this.listTitle.addEventListener('blur', this.onBlurListTitle.bind(this.listTitle));
            this.listTitle.addEventListener('keydown', this.onKeydownListTitle.bind(this.listTitle));
        }

        // Events

    }, {
        key: 'onClick\u0421heckboxForm',
        value: function onClickHeckboxForm() {
            var checkboxStete = !this.state.checkbox ? false : true;

            this.listItems.forEach(function (item) {
                item.state.checkbox = checkboxStete;
                item.onClickCheckbox();
            });

            this.state.checkbox = this.checkbox.checked;
            this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
        }
    }, {
        key: 'onKeydownListTitle',
        value: function onKeydownListTitle(e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }, {
        key: 'onBlurListTitle',
        value: function onBlurListTitle(e) {
            this.readOnly = true;
            this.classList.add('readonly');
        }
    }, {
        key: 'onInputListTitle',
        value: function onInputListTitle(e) {
            this.state.listTitle = this.listTitle.value;
            this.createrCustomEvents('listOnInputListTitle', { state: this.state }, this.listTitle);
            this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
        }
    }, {
        key: 'onDblclickListTitle',
        value: function onDblclickListTitle(e) {
            this.readOnly = false;
            this.classList.remove('readonly');
            this.select();
        }
    }, {
        key: 'onClickDeleteTodoList',
        value: function onClickDeleteTodoList() {
            if (!this.clickDeleteTodoListEvent) {
                this.customEventClickDeleteTodoList();
            }
            this.todoBox.dispatchEvent(this.clickDeleteTodoListEvent);
            this.todoBox.remove();
            this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
        }
    }, {
        key: 'onClickDeleteAllButton',
        value: function onClickDeleteAllButton(e) {
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
    }, {
        key: 'onClickButtonForm',
        value: function onClickButtonForm(e) {
            e.preventDefault();

            if (this.isEmptyInput()) {
                return alert('Введите текст');
            }

            this.initTodoItem(this.getInputValue());
        }

        // custom Event

    }, {
        key: 'customEventClickDeleteTodoList',
        value: function customEventClickDeleteTodoList() {
            this.clickDeleteTodoListEvent = new CustomEvent('onClickDeleteTodoList', {
                bubbles: true,
                detail: { elem: this }
            });
        }
    }, {
        key: 'customEventUpdateStorage',
        value: function customEventUpdateStorage(objElement, dispatchElement) {
            objElement = new CustomEvent('updateStorage', {
                bubbles: true,
                detail: { state: this.state }
            });

            dispatchElement.dispatchEvent(objElement);
        }

        // ***

    }, {
        key: 'createTodoItem',
        value: function createTodoItem(value, options) {
            var item = new _ToDoListItem.ToDoListItem(value, options);
            item.getListItem().addEventListener('ToDoListItem.todoItemClickCloseIcon', this.onClickCloseIconTodoItem.bind(this, item));

            return item;
        }
    }, {
        key: 'onClickCloseIconTodoItem',
        value: function onClickCloseIconTodoItem(item, e) {
            var _this2 = this;

            this.listItems.forEach(function (arrayItem, i) {
                if (arrayItem === item) {
                    return _this2.listItems.splice(i, 1);
                }
            });

            this.showAdditionalFunctions();
            this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
        }
    }, {
        key: 'createrCustomEvents',
        value: function createrCustomEvents(nameEvent, detailParams, dispatchElement) {
            var updateTitle = new CustomEvent(nameEvent, {
                bubbles: true,
                detail: detailParams
            });

            dispatchElement.dispatchEvent(updateTitle);
        }
    }, {
        key: 'initTodoItem',
        value: function initTodoItem(value, options) {
            var item = this.createTodoItem(value, options);
            this.addTodoItem(item);
            this.showAdditionalFunctions();
            this.itemsBox.scrollTop = this.itemsBox.scrollHeight;
        }
    }, {
        key: 'addTodoItem',
        value: function addTodoItem(item) {
            this.listItems.push(item);
            this.itemsBox.appendChild(item.getListItem());

            this.customEventUpdateStorage(this.updateStorageEvent, this.todoBox);
        }
    }, {
        key: 'showAdditionalFunctions',
        value: function showAdditionalFunctions() {
            if (this.listItems.length > 0) {
                this.additionalFunctions.classList.add('visible');
            } else {
                this.additionalFunctions.classList.remove('visible');
            }
        }
    }, {
        key: 'getInputValue',
        value: function getInputValue() {
            return this.formInput.value;
        }
    }, {
        key: 'isEmptyInput',
        value: function isEmptyInput() {
            return this.getInputValue() === '';
        }
    }, {
        key: 'isEmptyArray',
        value: function isEmptyArray() {
            return this.listItems.length === 0;
        }
    }, {
        key: 'getTodoList',
        value: function getTodoList() {
            return this.todoBox;
        }
    }, {
        key: 'getVisible',
        value: function getVisible() {
            this.todoBox.classList.add('visible');
        }
    }]);

    return ToDoList;
}();

},{"./ToDoListItem.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoListItemTemplate = '\n    <input type="checkbox" class="todo-item__checkbox">\n    <input class="todo-item__input">\n    <i class="todo-item__close-icon"></i>\n';

/**
 * @param  {string} value - The name of the item being created
 * @param  {object} state
 */

var ToDoListItem = exports.ToDoListItem = function () {
    function ToDoListItem(value, state) {
        _classCallCheck(this, ToDoListItem);

        this.state = state || {};
        this.state = {
            checkbox: false,
            input: value,
            closeBtn: false
        };
        this.state = Object.assign({}, this.state, state); // merge with new state

        this.itemBox = document.createElement('li');
        this.itemBox.innerHTML = ToDoListItemTemplate;
        this.checkbox = this.itemBox.querySelector('.todo-item__checkbox');
        this.input = this.itemBox.querySelector('.todo-item__input');
        this.closeBtn = this.itemBox.querySelector('.todo-item__close-icon');
        this.closeIconEvent;
        this.updateStorageEvent;
        this.inputEntryFieldEvent;
        this.checkboxEvent;

        this.init();
    }

    _createClass(ToDoListItem, [{
        key: 'setState',
        value: function setState() {
            this.input.value = this.state.input;
            this.checkbox.checked = this.state.checkbox;

            if (this.state.checkbox) {
                this.input.classList.add('completed');
            }
        }
    }, {
        key: 'init',
        value: function init() {
            this.itemBox.classList.add('todo-item');
            this.setState();
            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            this.closeBtn.addEventListener('click', this.onClickCloseIcon.bind(this));
            this.checkbox.addEventListener('click', this.onClickCheckbox.bind(this));
            this.input.addEventListener('input', this.onInputEntryField.bind(this));
        }

        /* Events */

    }, {
        key: 'onClickCloseIcon',
        value: function onClickCloseIcon(e) {
            e.target.parentNode.remove();
            this.state.closeBtn = !this.state.closeBtn;

            if (!this.closeIconEvent) {
                this.customEventClickCloseIconEvent();
            }
            this.closeBtn.dispatchEvent(this.closeIconEvent);

            if (!this.updateStorageEvent) {
                this.customEventUpdateLocalStorage();
            }
            this.itemBox.dispatchEvent(this.updateStorageEvent);
        }
    }, {
        key: 'onClickCheckbox',
        value: function onClickCheckbox(e) {
            this.state.checkbox = !this.state.checkbox;
            this.checkbox.checked = this.state.checkbox;

            if (!this.checkboxEvent) {
                this.customEventClickCheckbox();
            }
            this.checkbox.dispatchEvent(this.checkboxEvent);

            this.toggleCompleted();

            if (!this.updateStorageEvent) {
                this.customEventUpdateLocalStorage();
            }
            this.itemBox.dispatchEvent(this.updateStorageEvent);
        }
    }, {
        key: 'onInputEntryField',
        value: function onInputEntryField(e) {
            this.state.input = this.input.value;

            if (!this.inputEntryFieldEvent) {
                this.customEventInputEntryFieldEvent();
            }
            this.input.dispatchEvent(this.inputEntryFieldEvent);

            if (!this.updateStorageEvent) {
                this.customEventUpdateLocalStorage();
            }
            this.itemBox.dispatchEvent(this.updateStorageEvent);
        }

        /* Custom Events */

    }, {
        key: 'customEventClickCheckbox',
        value: function customEventClickCheckbox() {
            this.checkboxEvent = new CustomEvent("todoItemClickCheckbox", {
                bubbles: true,
                detail: { state: this.state }
            });
        }
    }, {
        key: 'customEventClickCloseIconEvent',
        value: function customEventClickCloseIconEvent() {
            this.closeIconEvent = new CustomEvent("ToDoListItem.todoItemClickCloseIcon", {
                bubbles: true,
                detail: { state: this.state }
            });
        }
    }, {
        key: 'customEventInputEntryFieldEvent',
        value: function customEventInputEntryFieldEvent() {
            this.inputEntryFieldEvent = new CustomEvent("todoItemOnInput", {
                bubbles: true,
                detail: { state: this.state }
            });
        }
    }, {
        key: 'customEventUpdateLocalStorage',
        value: function customEventUpdateLocalStorage() {
            this.updateStorageEvent = new CustomEvent("updateStorage", {
                bubbles: true,
                detail: { state: this.state }
            });
        }

        /* *** */

    }, {
        key: 'toggleCompleted',
        value: function toggleCompleted() {
            this.checkbox.checked ? this.input.classList.add('completed') : this.input.classList.remove('completed');
        }
    }, {
        key: 'getListItem',
        value: function getListItem() {
            return this.itemBox;
        }
    }]);

    return ToDoListItem;
}();

},{}],4:[function(require,module,exports){
'use strict';

var _ToDoBuilder = require('./ToDoBuilder.js');

var todoBuilderInitial = document.getElementById('todo-builder__initial');
var todoBuilderreturned = document.getElementById('todo-builder__lists-container');

var todoBuilder = new _ToDoBuilder.ToDoBuilder(todoBuilderInitial, todoBuilderreturned);

},{"./ToDoBuilder.js":1}]},{},[4]);
