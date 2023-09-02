import todoStore from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */

// el encargado de "redibujar" los todos
export const App = ( elementId ) => {

    //rebice uno de los filtros especificos del archivo todo.store de la funcion getTodos
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
    }

    // Cuando la Función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app )
        displayTodos()
    })();

    //Referencias HTML
    const newDecriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);

    //listeners
    newDecriptionInput.addEventListener('keyup', ( event ) => {

        if ( event.keyCode != 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos()
    });
}