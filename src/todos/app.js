import todoStore from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
}

/**
 * 
 * @param {String} elementId 
 */

// el encargado de "redibujar" los todos
export const App = (elementId) => {

    //rebice uno de los filtros especificos del archivo todo.store de la funcion getTodos
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())//no regresa el filtro seleccionado.
        //console.log(todos);
        renderTodos(ElementIDs.TodoList, todos) //! ID donve vamos a renderizar, todos por tipo de filtrado.
    }

    // Función autoinvocada  para cuando se llama a App
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app)
        displayTodos()
    })();

}