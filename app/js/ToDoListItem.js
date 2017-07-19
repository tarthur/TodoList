/**
 * @param  {string} inputValue - The name of the item being created
 * @param  {HTMLLIElement} itemBox - Item root box container 
 * @param  {HTMLInputElement} checkbox
 * @param  {HTMLInputElement} input
 * @param  {HTMLElement} input
 * @param  {object} state - The complete state of the object
 */
export class ToDoListItem {
    constructor(inputValue) {
        this.inputValue = inputValue;
        this.itemBox = document.createElement('li');
        this.checkbox = document.createElement('input');
        this.input = document.createElement('input');
        this.closeBtn = document.createElement('i');
        
        this.state = {
            checkbox : false,
            input : this.inputValue,
            closeBtn : false
        }

        this.init();
    }

    init() {
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

    initEvents() {
        this.closeBtn.addEventListener('click', (e) => { this.onClickCloseIcon(e) });
        this.checkbox.addEventListener('click', (e) => { this.onClickCheckbox(e) });
        this.input.addEventListener('input', (e) => { this.onInputEntryField(e) });
    }

    onChangedState(action) {
        let event = new CustomEvent("changeTodoItemState", {
            bubbles: true,
            detail: {
                action : action,
                state : this.state
            }
        });

        this.itemBox.dispatchEvent(event);
    }

    onInputEntryField(e) {
        this.state.input = this.input.value;
        this.onChangedState('changed');
    }

    onClickCloseIcon(e, rootElem) {
        if (!rootElem) {
            e.target.parentNode.remove();
        } else {
            rootElem.remove();
        }

        this.state.closeBtn = !this.state.closeBtn;
        this.onChangedState('deleted');
    }

    onClickCheckbox(e) {
        this.toggleCompleted();
        
        this.state.checkbox = !this.state.checkbox;
        this.onChangedState('finished');
    }

    toggleCompleted() {
        this.itemBox.classList.toggle('completed');
    }
}