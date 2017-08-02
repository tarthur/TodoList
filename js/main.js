import { ToDoBuilder } from "./ToDoBuilder.js";


let todoListContainer = document.getElementById('todo-list-builder__container');

let todoBuilder = new ToDoBuilder(todoListContainer);




window.onscroll = function (e) {
    let toolbar = document.getElementById('toolbar');
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
    scrolled > 1 ? toolbar.classList.add('paper-up') : toolbar.classList.remove('paper-up');
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}