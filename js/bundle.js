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
 * @param {HTMLBlockElement} initialElement
 * @param {HTMLBlockElement} resultBox
 */
var ToDoBuilder = exports.ToDoBuilder = function () {
    function ToDoBuilder(resultBox) {
        _classCallCheck(this, ToDoBuilder);

        this.addBtn = document.getElementById('todo-list-builder__add-btn');
        this.clearBtn = document.getElementById('todo-list-builder__clear-btn');
        this.resultBox = resultBox;
        this.localStorageArray = null;
        this.todoListArray = [];

        this.init();
    }

    _createClass(ToDoBuilder, [{
        key: 'init',
        value: function init() {
            this.checkLocalStorage();
            this.initEvents();
            this.initCustomEvents();
            this.oneItem();
        }
    }, {
        key: 'checkLocalStorage',
        value: function checkLocalStorage() {
            var todoBuilderLocalStorage = localStorage.getItem('todoBuilder');

            if (todoBuilderLocalStorage && todoBuilderLocalStorage !== '[]') {
                todoBuilderLocalStorage = JSON.parse(todoBuilderLocalStorage);
                this.buildFromLocalStorage(todoBuilderLocalStorage);
            } else {
                this.addTodoList();
            }
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            this.addBtn.addEventListener('click', this.onClickAddBtn.bind(this));
            this.clearBtn.addEventListener('click', this.onClickClearBtn.bind(this));
        }
    }, {
        key: 'initCustomEvents',
        value: function initCustomEvents() {
            this.resultBox.addEventListener('onClickDeleteTodoList', this.onClickDeleteTodoList.bind(this));
            this.resultBox.addEventListener('updateStorage', this.updateLocalStorage.bind(this));
            this.resultBox.addEventListener('ToDoListItem.todoItemClickCloseIcon', this.updateLocalStorage.bind(this, 'changeStructure'));
            this.resultBox.addEventListener('ToDoList.onDeleteAllItems', this.updateLocalStorage.bind(this, 'changeStructure'));
            this.resultBox.addEventListener('ToDoBuilder.addTodoListEvent', this.updateLocalStorage.bind(this, 'changeStructure'));
            this.resultBox.addEventListener('ToDoBuilder.addTodoListEvent', this.updateLocalStorage.bind(this, 'changeStructure'));
        }
    }, {
        key: 'buildFromLocalStorage',
        value: function buildFromLocalStorage(todoBuilderLocalStorage) {
            var _this = this;

            this.clearResultBox();

            todoBuilderLocalStorage.forEach(function (todoListObj) {
                _this.buildLocalStorageTodoList(todoListObj);
            });
        }
    }, {
        key: 'buildLocalStorageTodoList',
        value: function buildLocalStorageTodoList(todoListObj) {
            var toDoList = todoListObj.todoList;
            var toDoListItems = todoListObj.totoListArr;

            var newTodoList = new _ToDoList.ToDoList(toDoList.todolistTextTitle);

            this.todoListArray.push(newTodoList);
            this.getVisibleClearBtn();

            this.buildLocalStorageTodoListItems(newTodoList, toDoListItems);

            this.resultBox.appendChild(newTodoList.getTodoList());
            newTodoList.getVisible();
        }
    }, {
        key: 'buildLocalStorageTodoListItems',
        value: function buildLocalStorageTodoListItems(toDoList, toDoListItems) {
            toDoListItems.forEach(function (toDoListItem) {
                toDoList.initTodoItem(toDoListItem.valueValue, toDoListItem.checkboxChecked);
            });
        }
    }, {
        key: 'clearResultBox',
        value: function clearResultBox() {
            this.todoListArray = [];
            this.resultBox.innerHTML = '';
        }
    }, {
        key: 'updateLocalStorage',
        value: function updateLocalStorage(structure) {
            this.setLocalStorageData(structure);
            this.oneItem();
        }
    }, {
        key: 'setLocalStorageData',
        value: function setLocalStorageData(structure) {
            if (structure === 'changeStructure' || this.localStorageArray === null) {
                this.localStorageArray = this.todoListArray.map(function (totoList) {
                    return {
                        'todoList': totoList,
                        'totoListArr': totoList.listItems
                    };
                });
            }

            var newData = JSON.stringify(this.localStorageArray);

            localStorage.setItem('todoBuilder', newData);
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
            this.updateLocalStorage('changeStructure');
        }
    }, {
        key: 'onClickClearBtn',
        value: function onClickClearBtn(e) {
            if (e.target === this.clearBtn) {
                this.clear();
                this.getVisibleClearBtn();
                this.addTodoList();
                this.updateLocalStorage('changeStructure');
            }
        }
    }, {
        key: 'onClickAddBtn',
        value: function onClickAddBtn(e) {
            this.addTodoList();
            this.customEventAddTodoListEvent();
            this.updateLocalStorage('changeStructure');
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
            this.oneItem();
        }
    }, {
        key: 'customEventAddTodoListEvent',
        value: function customEventAddTodoListEvent() {
            event = new CustomEvent("ToDoBuilder.addTodoListEvent", {
                bubbles: true,
                detail: {}
            });

            this.addBtn.dispatchEvent(event);
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
        key: 'oneItem',
        value: function oneItem() {
            if (this.todoListArray.length === 1) {
                this.resultBox.classList.add('one-item');
            } else {
                this.resultBox.classList.remove('one-item');
            }
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
    listTitle: 'List title',
    inputPlaceholder: 'What needs to be done?...'
};

var listItemTemplate = '\n    <div class="todo-list__title-wrap">\n        <input class="todo-list__title" type="text" readonly" readonly>\n        <button class="todo-list__delete-todo-list"></button>\n    </div>\n    <ul class="todo-list__todo-list-items"></ul>\n    <form class="todo-list__form">\n        <input class="todo-list__form-input" type="text">\n        <button class="todo-list__form-delete-btn"></button>\n    </form>\n';

/**
 * @param {string} valueValue
 */

var ToDoList = exports.ToDoList = function () {
    function ToDoList() {
        var valueValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, ToDoList);

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

    _createClass(ToDoList, [{
        key: 'init',
        value: function init() {
            this.todoList.classList.add('todo-list');
            // set state
            this.todoListTitle.value = this.todolistTextTitle;
            this.formInput.placeholder = this.inputTextPlaceholder;

            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            this.todoListDeleteBtn.addEventListener('click', this.onClickDeleteTodoList.bind(this));
            this.formDeleteAllButton.addEventListener('click', this.onClickDeleteAllButton.bind(this));
            this.formInput.addEventListener('input', this.onClickButtonForm.bind(this));
            this.listTitleEvents();
        }
    }, {
        key: 'listTitleEvents',
        value: function listTitleEvents() {
            this.todoListTitle.addEventListener('input', this.onInputListTitle.bind(this));
            this.todoListTitle.addEventListener('dblclick', this.onDblclickListTitle.bind(this.todoListTitle));
            this.todoListTitle.addEventListener('blur', this.onBlurListTitle.bind(this));
            this.todoListTitle.addEventListener('keydown', this.onKeydownListTitle.bind(this.todoListTitle));
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
            this.todoListTitle.readOnly = true;
            this.todoListTitle.classList.add('readonly');
            this.todolistTextTitle = this.todoListTitle.value;
            this.customEventUpdateStorage(this.updateStorageEvent, this.todoList);
        }
    }, {
        key: 'onInputListTitle',
        value: function onInputListTitle(e) {
            this.todolistTitle = this.todoListTitle.value;
            this.createrCustomEvents('listOnInputListTitle', { state: this.state }, this.todoListTitle);
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
            this.todoList.dispatchEvent(this.clickDeleteTodoListEvent);
            this.todoList.remove();
            this.customEventUpdateStorage(this.updateStorageEvent, this.todoList);
        }
    }, {
        key: 'onClickDeleteAllButton',
        value: function onClickDeleteAllButton(e) {
            e.preventDefault();

            if (!this.isEmptyArray()) {
                this.listItems = [];
                this.todoListItems.innerHTML = '';

                this.isListEmpty = false;
                this.createrCustomEvents('ToDoList.onDeleteAllItems', { state: this.state }, this.todoList);
            }
        }
    }, {
        key: 'onClickButtonForm',
        value: function onClickButtonForm(e) {
            this.initTodoItem(this.getInputValue());
        }
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
                detail: { state: 2 }
            });

            dispatchElement.dispatchEvent(objElement);
        }
    }, {
        key: 'createTodoItem',
        value: function createTodoItem(valueValue, checkboxChecked) {
            var item = new _ToDoListItem.ToDoListItem(valueValue, checkboxChecked);
            item.getListItem().addEventListener('ToDoListItem.todoItemClickCloseIcon', this.onClickCloseIconTodoItem.bind(this, item));

            return item;
        }
    }, {
        key: 'onClickCloseIconTodoItem',
        value: function onClickCloseIconTodoItem(item, e) {
            var _this = this;

            this.listItems.forEach(function (arrayItem, i) {
                if (arrayItem === item) {
                    return _this.listItems.splice(i, 1);
                }
            });
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
        value: function initTodoItem(valueValue, checkboxChecked) {
            var item = this.createTodoItem(valueValue, checkboxChecked);
            this.addTodoItem(item);
            this.todoListItems.scrollTop = this.todoListItems.scrollHeight;
            item.input.focus();
            this.formInput.value = '';
        }
    }, {
        key: 'addTodoItem',
        value: function addTodoItem(item) {
            this.listItems.push(item);
            this.todoListItems.appendChild(item.getListItem());

            this.customEventUpdateStorage(this.updateStorageEvent, this.todoList);
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
            return this.todoList;
        }
    }, {
        key: 'getVisible',
        value: function getVisible() {
            this.todoList.classList.add('visible');
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

var ToDoListItemTemplate = '\n    <label class="todo-list-item__checkbox-lable">\n        <input class="todo-list-item__checkbox" type="checkbox">\n    </label>\n    <input class="todo-list-item__input" id="todo-list-item__input">\n    <i class="todo-list-item__close-btn"></i>\n';

/**
 * @param  {string} value - The name of the item being created
 * @param  {object} checkbox
 */

var ToDoListItem = exports.ToDoListItem = function () {
    function ToDoListItem() {
        var valueValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var checkboxChecked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, ToDoListItem);

        this.itemBox = document.createElement('li');
        this.itemBox.innerHTML = ToDoListItemTemplate;
        // find html elements
        this.checkbox = this.itemBox.querySelector('.todo-list-item__checkbox');
        this.input = this.itemBox.querySelector('.todo-list-item__input');
        this.closeBtn = this.itemBox.querySelector('.todo-list-item__close-btn');
        this.checkboxLabel = this.itemBox.querySelector('.todo-list-item__checkbox-lable');
        // state
        this.valueValue = valueValue;
        this.checkboxChecked = checkboxChecked;
        // events
        this.closeIconEvent;
        this.updateStorageEvent;
        this.inputEntryFieldEvent;

        this.init();
    }

    _createClass(ToDoListItem, [{
        key: 'init',
        value: function init() {
            this.itemBox.classList.add('todo-list-item');
            this.input.value = this.valueValue;
            this.checkbox.checked = this.checkboxChecked;

            this.toggleCompleted(this.checkboxChecked);
            this.initEvents();
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            this.closeBtn.addEventListener('click', this.onClickCloseIcon.bind(this));
            this.checkboxLabel.addEventListener('click', this.onClickCheckboxLabel.bind(this));
            this.input.addEventListener('input', this.onInputEntryField.bind(this));
        }
    }, {
        key: 'onClickCheckboxLabel',
        value: function onClickCheckboxLabel(e) {
            if (e.target === this.checkboxLabel) {
                this.clickCheckbox();
            }
        }
    }, {
        key: 'clickCheckbox',
        value: function clickCheckbox() {
            console.log(this.toggleCompleted(this.checkbox.checked));
            this.toggleCompleted(!this.checkbox.checked);

            if (!this.updateStorageEvent) {
                this.customEventUpdateLocalStorage();
            }
            this.checkbox.dispatchEvent(this.updateStorageEvent);
        }
    }, {
        key: 'onClickCloseIcon',
        value: function onClickCloseIcon(e) {
            if (!this.closeIconEvent) {
                this.customEventClickCloseIconEvent();
            }
            this.closeBtn.dispatchEvent(this.closeIconEvent);

            if (!this.updateStorageEvent) {
                this.customEventUpdateLocalStorage();
            }
            this.itemBox.dispatchEvent(this.updateStorageEvent);

            e.target.parentNode.remove();
        }

        // onClickCheckbox(e) {
        // }

    }, {
        key: 'onInputEntryField',
        value: function onInputEntryField(e) {
            this.valueValue = this.input.value;

            if (!this.inputEntryFieldEvent) {
                this.customEventInputEntryFieldEvent();
            }
            this.input.dispatchEvent(this.inputEntryFieldEvent);

            if (!this.updateStorageEvent) {
                this.customEventUpdateLocalStorage();
            }
            this.itemBox.dispatchEvent(this.updateStorageEvent);
        }
    }, {
        key: 'customEventClickCloseIconEvent',
        value: function customEventClickCloseIconEvent() {
            this.closeIconEvent = new CustomEvent("ToDoListItem.todoItemClickCloseIcon", {
                bubbles: true,
                detail: {
                    'valueValue': this.valueValue,
                    'checkboxChecked': this.checkboxChecked
                }
            });
        }
    }, {
        key: 'customEventInputEntryFieldEvent',
        value: function customEventInputEntryFieldEvent() {
            this.inputEntryFieldEvent = new CustomEvent("todoItemOnInput", {
                bubbles: true,
                detail: {
                    'valueValue': this.valueValue,
                    'checkboxChecked': this.checkboxChecked
                }
            });
        }
    }, {
        key: 'customEventUpdateLocalStorage',
        value: function customEventUpdateLocalStorage() {
            this.updateStorageEvent = new CustomEvent("updateStorage", {
                bubbles: true,
                detail: this.checkboxChecked
            });
        }
    }, {
        key: 'toggleCompleted',
        value: function toggleCompleted(state) {
            if (state) {
                this.itemBox.classList.add('completed');
            } else {
                this.itemBox.classList.remove('completed');
            }

            return this.checkboxChecked = state;
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

var todoListContainer = document.getElementById('todo-list-builder__container');

var todoBuilder = new _ToDoBuilder.ToDoBuilder(todoListContainer);

window.onscroll = function (e) {
  var toolbar = document.getElementById('toolbar');
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;

  scrolled > 1 ? toolbar.classList.add('paper-up') : toolbar.classList.remove('paper-up');
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

},{"./ToDoBuilder.js":1}]},{},[4]);
