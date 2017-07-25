const ToDoListItemTemplate = `
    <input type="checkbox" class="todo-item__checkbox">
    <input class="todo-item__input">
    <i class="todo-item__close-icon"></i>
`;

/**
 * @param  {string} value - The name of the item being created
 * @param  {object} checkbox
 */
export class ToDoListItem {
    constructor(valueValue = '', checkboxChecked = false) {
        this.itemBox = document.createElement('li');
        this.itemBox.innerHTML = ToDoListItemTemplate;
        this.checkbox = this.itemBox.querySelector('.todo-item__checkbox');
        this.input = this.itemBox.querySelector('.todo-item__input');
        this.closeBtn = this.itemBox.querySelector('.todo-item__close-icon');

        this.valueValue = valueValue;
        this.checkboxChecked = checkboxChecked;

        this.closeIconEvent;
        this.updateStorageEvent;
        this.inputEntryFieldEvent;
        this.checkboxEvent;

        this.init();
    }

    init() {
        this.itemBox.classList.add('todo-item');
        this.input.value = this.valueValue;
        this.checkbox.checked = this.checkboxChecked;
        if (this.checkboxChecked) { this.input.classList.add('completed'); }

        this.initEvents();
    }

    initEvents() {
        this.closeBtn.addEventListener('click', this.onClickCloseIcon.bind(this));
        this.checkbox.addEventListener('click', this.onClickCheckbox.bind(this));
        this.input.addEventListener('input', this.onInputEntryField.bind(this));
    }

    /* Events */

    onClickCloseIcon(e) {
        if (!this.closeIconEvent) { this.customEventClickCloseIconEvent(); }
        this.closeBtn.dispatchEvent(this.closeIconEvent);

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);

        e.target.parentNode.remove();
    }

    onClickCheckbox(e) {
        this.checkboxChecked = !this.checkboxChecked;
        this.checkbox.checked = this.checkboxChecked;

        if (!this.checkboxEvent) { this.customEventClickCheckbox(); }
        this.checkbox.dispatchEvent(this.checkboxEvent);

        this.toggleCompleted();

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);
    }

    onInputEntryField(e) {
        this.valueValue = this.input.value;

        if (!this.inputEntryFieldEvent) { this.customEventInputEntryFieldEvent(); }
        this.input.dispatchEvent(this.inputEntryFieldEvent);

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);
    }

    /* Custom Events */

    customEventClickCheckbox() {
        this.checkboxEvent = new CustomEvent("todoItemClickCheckbox", {
            bubbles: true,
            detail: {
                'valueValue' : this.valueValue,
                'checkboxChecked' : this.checkboxChecked
            }
        });
    }

    customEventClickCloseIconEvent() {
        this.closeIconEvent = new CustomEvent("ToDoListItem.todoItemClickCloseIcon", {
            bubbles: true,
            detail: {
                'valueValue' : this.valueValue,
                'checkboxChecked' : this.checkboxChecked
            }
        });
    }

    customEventInputEntryFieldEvent() {
        this.inputEntryFieldEvent = new CustomEvent("todoItemOnInput", {
            bubbles: true,
            detail: {
                'valueValue' : this.valueValue,
                'checkboxChecked' : this.checkboxChecked
            }
        });
    }

    customEventUpdateLocalStorage() {
        this.updateStorageEvent = new CustomEvent("updateStorage", {
            bubbles: true,
            detail: {
                'valueValue' : this.valueValue,
                'checkboxChecked' : this.checkboxChecked
            }
        });
    }

    /* *** */

    toggleCompleted() { this.checkbox.checked ? this.input.classList.add('completed') : this.input.classList.remove('completed'); }
    getListItem() { return this.itemBox; }
}