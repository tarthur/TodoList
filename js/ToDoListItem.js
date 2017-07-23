const ToDoListItemTemplate = `
    <input type="checkbox" class="todo-item__checkbox">
    <input class="todo-item__input">
    <i class="todo-item__close-icon"></i>
`;

/**
 * @param  {string} value - The name of the item being created
 * @param  {object} state
 */
export class ToDoListItem {
    constructor(value, state) {
        this.state = state || {};
        this.state = {
            checkbox: false,
            input: value,
            closeBtn: false
        }
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
    
    setState() {
        this.input.value = this.state.input;
        this.checkbox.checked = this.state.checkbox;

        if (this.state.checkbox) {
            this.input.classList.add('completed');
        }
    }

    init() {
        this.itemBox.classList.add('todo-item');
        this.setState();
        this.initEvents();
    }

    initEvents() {
        this.closeBtn.addEventListener('click', this.onClickCloseIcon.bind(this));
        this.checkbox.addEventListener('click', this.onClickCheckbox.bind(this));
        this.input.addEventListener('input', this.onInputEntryField.bind(this));
    }

    /* Events */

    onClickCloseIcon(e) {
        e.target.parentNode.remove();
        this.state.closeBtn = !this.state.closeBtn;

        if (!this.closeIconEvent) { this.customEventClickCloseIconEvent(); }
        this.closeBtn.dispatchEvent(this.closeIconEvent);

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);
    }

    onClickCheckbox(e) {
        this.state.checkbox = !this.state.checkbox;
        this.checkbox.checked = this.state.checkbox;

        if (!this.checkboxEvent) { this.customEventClickCheckbox(); }
        this.checkbox.dispatchEvent(this.checkboxEvent);

        this.toggleCompleted();

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);
    }

    onInputEntryField(e) {
        this.state.input = this.input.value;

        if (!this.inputEntryFieldEvent) { this.customEventInputEntryFieldEvent(); }
        this.input.dispatchEvent(this.inputEntryFieldEvent);

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);
    }

    /* Custom Events */

    customEventClickCheckbox() {
        this.checkboxEvent = new CustomEvent("todoItemClickCheckbox", {
            bubbles: true,
            detail: { state: this.state }
        });
    }

    customEventClickCloseIconEvent() {
        this.closeIconEvent = new CustomEvent("ToDoListItem.todoItemClickCloseIcon", {
            bubbles: true,
            detail: { state: this.state }
        });
    }

    customEventInputEntryFieldEvent() {
        this.inputEntryFieldEvent = new CustomEvent("todoItemOnInput", {
            bubbles: true,
            detail: { state: this.state }
        });
    }

    customEventUpdateLocalStorage() {
        this.updateStorageEvent = new CustomEvent("updateStorage", {
            bubbles: true,
            detail: { state: this.state }
        });
    }

    /* *** */
    
    toggleCompleted() { this.checkbox.checked ? this.input.classList.add('completed') : this.input.classList.remove('completed'); }
    getListItem() { return this.itemBox; }
}