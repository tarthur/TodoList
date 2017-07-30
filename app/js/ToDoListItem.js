const ToDoListItemTemplate = `
    <label class="todo-list-item__checkbox-lable">
        <input class="todo-list-item__checkbox" type="checkbox">
    </label>
    <input class="todo-list-item__input" id="todo-list-item__input">
    <i class="todo-list-item__close-btn"></i>
`;

/**
 * @param  {string} value - The name of the item being created
 * @param  {object} checkbox
 */
export class ToDoListItem {
    constructor(valueValue = '', checkboxChecked = false) {
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

    init() {
        this.itemBox.classList.add('todo-list-item');
        this.input.value = this.valueValue;
        this.checkbox.checked = this.checkboxChecked;
        if (this.checkboxChecked) { this.input.classList.add('completed'); }

        this.initEvents();
        
    }

    initEvents() {
        this.closeBtn.addEventListener('click', this.onClickCloseIcon.bind(this));
        this.checkbox.addEventListener('click', this.onClickCheckbox.bind(this));
        this.checkboxLabel.addEventListener('click', this.onClickCheckboxLabel.bind(this));
        this.input.addEventListener('input', this.onInputEntryField.bind(this));
    }

    onClickCheckboxLabel(e) {
    }

    onClickCloseIcon(e) {
        if (!this.closeIconEvent) { this.customEventClickCloseIconEvent(); }
        this.closeBtn.dispatchEvent(this.closeIconEvent);

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);

        e.target.parentNode.remove();
    }

    onClickCheckbox(e) {
        this.checkboxChecked = this.checkbox.checked;
        this.toggleCompleted();
 
            console.log(this.checkboxChecked)
        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.checkbox.dispatchEvent(this.updateStorageEvent);
    }

    onInputEntryField(e) {
        this.valueValue = this.input.value;

        if (!this.inputEntryFieldEvent) { this.customEventInputEntryFieldEvent(); }
        this.input.dispatchEvent(this.inputEntryFieldEvent);

        if (!this.updateStorageEvent) { this.customEventUpdateLocalStorage(); }
        this.itemBox.dispatchEvent(this.updateStorageEvent);
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
            detail: this.checkboxChecked
        });
    }

    toggleCompleted() { 
        this.checkbox.checked ? this.input.classList.add('completed') : this.input.classList.remove('completed'); 
    }

    getListItem() { return this.itemBox; }
}