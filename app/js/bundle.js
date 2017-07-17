(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    function ToDoList(rootElement) {
        _classCallCheck(this, ToDoList);

        this.todoBox = rootElement;
        this.form = this.todoBox.querySelector('.todo-form');
        this.formInput = this.todoBox.querySelector('.todo-form__input');
        this.formButton = this.todoBox.querySelector('.todo-form__btn');
        this.itemsBox = document.createElement('ul');
        this.listItems = [];

        this.init();
    }

    _createClass(ToDoList, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.todoBox.classList.add('todo');
            this.itemsBox.classList.add('todo__items-box');
            this.todoBox.appendChild(this.itemsBox);

            this.formButton.addEventListener('click', function (e) {
                _this.onClickButtonForm(e);
            });
        }
    }, {
        key: 'onClickButtonForm',
        value: function onClickButtonForm(e) {
            e.preventDefault();

            if (this.isEmptyInput()) {
                return alert('Введите текст');
            }

            if (this.isIdenticalItem(this.getInputValue())) {
                return alert('Такая задача уже есть');
            }

            this.addTodoItem();
        }
    }, {
        key: 'addTodoItem',
        value: function addTodoItem() {
            var elem = this.createTodoItem();
            this.listItems.push(elem);
            this.itemsBox.appendChild(elem.itemBox);
        }
    }, {
        key: 'createTodoItem',
        value: function createTodoItem(value) {
            var _this2 = this;

            var currentItemState = new _ToDoListItem.ToDoListItem(this.getInputValue()).getState();
            currentItemState.itemBox.addEventListener('changeTodoItemState', function (e) {
                _this2.onChangedTodoState(e);
            });
            return currentItemState;
        }
    }, {
        key: 'onChangedTodoState',
        value: function onChangedTodoState(e) {
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
    }, {
        key: 'deleteItem',
        value: function deleteItem(e) {
            var _this3 = this;

            this.listItems.forEach(function (item, i) {
                if (item === e.detail.state) {
                    return _this3.listItems.splice(i, 1);
                }
            });
        }
    }, {
        key: 'changedItem',
        value: function changedItem(e) {
            console.log('changedItem');
        }
    }, {
        key: 'finishedItem',
        value: function finishedItem(e) {
            console.log('finishedItem');
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
        key: 'isIdenticalItem',
        value: function isIdenticalItem(value) {
            for (var i = 0; i < this.listItems.length; i++) {
                if (this.listItems[i].input === value) return true;
            }
        }
    }]);

    return ToDoList;
}();

},{"./ToDoListItem.js":2}],2:[function(require,module,exports){
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
            itemBox: this.itemBox,
            checkbox: false,
            input: this.inputValue,
            closeBtn: false
        };

        this.initEvents();
        this.createTodoItem();
    }

    _createClass(ToDoListItem, [{
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
        value: function onChangedState(act) {
            var event = new CustomEvent("changeTodoItemState", {
                bubbles: true,
                detail: {
                    act: act,
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
        value: function onClickCloseIcon(e) {
            e.target.parentNode.remove();
            this.state.closeBtn = !this.state.closeBtn;
            this.onChangedState('deleted');
        }
    }, {
        key: 'onClickCheckbox',
        value: function onClickCheckbox(_ref) {
            var target = _ref.target;

            this.toggleCompleted();
            this.state.checkbox = !this.state.checkbox;
            this.onChangedState('finished');
        }
    }, {
        key: 'createTodoItem',
        value: function createTodoItem() {
            this.checkbox.type = 'checkbox';
            this.checkbox.classList.add('todo-item__checkbox');
            this.itemBox.classList.add('todo-item');
            this.input.classList.add('todo-item__input');
            this.closeBtn.classList.add('todo-item__close-icon');
            this.itemBox.appendChild(this.checkbox);
            this.input.value = this.inputValue;
            this.itemBox.appendChild(this.input);
            this.itemBox.appendChild(this.closeBtn);
        }
    }, {
        key: 'getState',
        value: function getState() {
            return this.state;
        }
    }, {
        key: 'toggleCompleted',
        value: function toggleCompleted() {
            this.itemBox.classList.toggle('completed');
        }
    }]);

    return ToDoListItem;
}();

},{}],3:[function(require,module,exports){
'use strict';

var _ToDoList = require('./ToDoList.js');

var todo_1 = document.getElementById('todo-1');
var todo1 = new _ToDoList.ToDoList(todo_1);

var todo_2 = document.getElementById('todo-2');
var todo2 = new _ToDoList.ToDoList(todo_2);

},{"./ToDoList.js":1}]},{},[3]);
