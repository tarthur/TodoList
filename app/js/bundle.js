(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToDoBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ToDoList = require('./ToDoList.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {HTMLButtonElement} btn
 */
var ToDoBuilder = exports.ToDoBuilder = function () {
    function ToDoBuilder(btn) {
        _classCallCheck(this, ToDoBuilder);

        this.btn = btn;
        this.result = document.getElementById('result');

        this.init();
    }

    _createClass(ToDoBuilder, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.addTodoList();
            this.btn.addEventListener('click', function (e) {
                _this.onClickBtn(e);
            });
        }
    }, {
        key: 'onClickBtn',
        value: function onClickBtn(e) {
            this.addTodoList();
        }
    }, {
        key: 'addTodoList',
        value: function addTodoList() {
            var todoList = new _ToDoList.ToDoList();
            this.result.appendChild(todoList.getTodoList());
            setTimeout(function () {
                todoList.getVisible();
            }, 10);
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

/**
 * @param {HTML any block blement} todoBox
 * @param {HTMLFormElement} form
 * @param {HTMLInputElement} formInput
 * @param {HTMLButtonElement} formButton
 * @param {HTMLULElement} itemsBox
 * @param {Array} itemsBox
 */
var ToDoList = exports.ToDoList = function () {
    function ToDoList() {
        _classCallCheck(this, ToDoList);

        this.todoBox = document.createElement('div');
        this.form = document.createElement('form');
        this.formInput = document.createElement('input');
        this.formButton = document.createElement('button');
        this.formDeleteAllButton = document.createElement('button');
        this.itemsBox = document.createElement('ul');
        this.listItems = [];

        this.init();
    }

    _createClass(ToDoList, [{
        key: 'init',
        value: function init() {
            this.todoBox.classList.add('todo');

            this.form.classList.add('todo-form');
            this.formInput.classList.add('todo-form__input');
            this.formInput.type = 'text';
            this.formInput.placeholder = 'What needs to be done?...';
            this.formButton.classList.add('todo-form__btn');
            this.formDeleteAllButton.classList.add('todo-form__delete-btn');
            this.formDeleteAllButton.innerHTML = 'Delete All';

            this.itemsBox.classList.add('todo__items-box');

            this.form.appendChild(this.formDeleteAllButton);
            this.form.appendChild(this.formInput);
            this.form.appendChild(this.formButton);
            this.todoBox.appendChild(this.form);
            this.todoBox.appendChild(this.itemsBox);

            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var _this = this;

            this.formButton.addEventListener('click', function (e) {
                _this.onClickButtonForm(e);
            });
            this.formDeleteAllButton.addEventListener('click', function (e) {
                _this.onClickDeleteAllButton(e);
            });
        }
    }, {
        key: 'onClickDeleteAllButton',
        value: function onClickDeleteAllButton(e) {
            e.preventDefault();

            if (!this.isEmptyArray()) {
                var l = this.listItems.length;

                for (var i = l - 1; i >= 0; i--) {
                    this.listItems[i].onClickCloseIcon(null, this.listItems[i].itemBox);
                }
            }
        }
    }, {
        key: 'onClickButtonForm',
        value: function onClickButtonForm(e) {
            e.preventDefault();

            if (this.isEmptyInput()) {
                return alert('Введите текст');
            }

            this.addTodoItem();
        }
    }, {
        key: 'addTodoItem',
        value: function addTodoItem() {
            var item = this.createTodoItem();

            this.listItems.push(item);
            this.itemsBox.appendChild(item.itemBox);
        }
    }, {
        key: 'createTodoItem',
        value: function createTodoItem(value) {
            var _this2 = this;

            var item = new _ToDoListItem.ToDoListItem(this.getInputValue());
            item.itemBox.addEventListener('changeTodoItemState', function (e) {
                _this2.onChangedTodoState(e, item);
            });

            return item;
        }
    }, {
        key: 'onChangedTodoState',
        value: function onChangedTodoState(e, item) {
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
    }, {
        key: 'deleteItem',
        value: function deleteItem(e, item) {
            var _this3 = this;

            this.listItems.forEach(function (arrayItem, i) {
                if (arrayItem === item) {
                    return _this3.listItems.splice(i, 1);
                }
            });
        }
    }, {
        key: 'changedItem',
        value: function changedItem(e, item) {
            console.log('finishedItem. ToDoListItem.state: ' + item.state.input);
        }
    }, {
        key: 'finishedItem',
        value: function finishedItem(e, item) {
            console.log('finishedItem. ToDoListItem.state: ' + item.state.checkbox);
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

/**
 * @param  {string} inputValue - The name of the item being created
 * @param  {HTMLLIElement} itemBox - Item root box container 
 * @param  {HTMLInputElement} checkbox
 * @param  {HTMLInputElement} input
 * @param  {HTMLElement} input
 * @param  {object} state - The complete state of the object
 */
var ToDoListItem = exports.ToDoListItem = function () {
    function ToDoListItem(inputValue) {
        _classCallCheck(this, ToDoListItem);

        this.inputValue = inputValue;
        this.itemBox = document.createElement('li');
        this.checkbox = document.createElement('input');
        this.input = document.createElement('input');
        this.closeBtn = document.createElement('i');

        this.state = {
            checkbox: false,
            input: this.inputValue,
            closeBtn: false
        };

        this.init();
    }

    _createClass(ToDoListItem, [{
        key: 'init',
        value: function init() {
            this.checkbox.type = 'checkbox';
            this.checkbox.classList.add('todo-item__checkbox');
            this.itemBox.classList.add('todo-item');
            this.input.classList.add('todo-item__input');
            this.closeBtn.classList.add('todo-item__close-icon');
            this.itemBox.appendChild(this.checkbox);
            this.input.value = this.inputValue;
            this.itemBox.appendChild(this.input);
            this.itemBox.appendChild(this.closeBtn);

            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var _this = this;

            this.closeBtn.addEventListener('click', function (e) {
                _this.onClickCloseIcon(e);
            });
            this.checkbox.addEventListener('click', function (e) {
                _this.onClickCheckbox(e);
            });
            this.input.addEventListener('input', function (e) {
                _this.onInputEntryField(e);
            });
        }
    }, {
        key: 'onChangedState',
        value: function onChangedState(action) {
            var event = new CustomEvent("changeTodoItemState", {
                bubbles: true,
                detail: {
                    action: action,
                    state: this.state
                }
            });

            this.itemBox.dispatchEvent(event);
        }
    }, {
        key: 'onInputEntryField',
        value: function onInputEntryField(e) {
            this.state.input = this.input.value;
            this.onChangedState('changed');
        }
    }, {
        key: 'onClickCloseIcon',
        value: function onClickCloseIcon(e, rootElem) {
            if (!rootElem) {
                e.target.parentNode.remove();
            } else {
                rootElem.remove();
            }

            this.state.closeBtn = !this.state.closeBtn;
            this.onChangedState('deleted');
        }
    }, {
        key: 'onClickCheckbox',
        value: function onClickCheckbox(e) {
            this.toggleCompleted();

            this.state.checkbox = !this.state.checkbox;
            this.onChangedState('finished');
        }
    }, {
        key: 'toggleCompleted',
        value: function toggleCompleted() {
            this.itemBox.classList.toggle('completed');
        }
    }]);

    return ToDoListItem;
}();

},{}],4:[function(require,module,exports){
"use strict";

var _ToDoBuilder = require("./ToDoBuilder.js");

var listBuilder = document.getElementById('listBuilder');
var todoBuilder = new _ToDoBuilder.ToDoBuilder(listBuilder);

},{"./ToDoBuilder.js":1}]},{},[4]);
