import { renderTodos, renderPending } from './use-cases';
import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store';


const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
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
        updatePendingCount()
    }
    const updatePendingCount = () => {

        //esta funcion viene del archivo render-pending 
        renderPending(ElementIDs.PendingCountLabel); //el argumento es el objeto de las refencias de id o clases en el html
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
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);
    const filterLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    //listeners
    newDecriptionInput.addEventListener('keyup', ( event ) => {

        if ( event.keyCode != 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest( '[data-id]' );
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos()
    });

    todoListUL.addEventListener('click', ( event ) => {
        
        const isDestroyElement = event.target.className  === 'destroy';
        const element = event.target.closest( '[data-id]' );
        if ( !element || !isDestroyElement ) return;
        
        todoStore.deleteTodo( element.getAttribute( 'data-id' ) );
        displayTodos();
    })
    //Evento para eliminar aquellos todos completados
    clearCompletedButton.addEventListener('click', (  ) => {

        todoStore.deleteCompleted()
        displayTodos()

    })
    //Nos permite filtrar los Todos
    filterLIs.forEach( element => {
        element.addEventListener('click', (element) => {
            //recorre los filtros para buscar los elementos seleccionados
            filterLIs.forEach(el => el.classList.remove('selected'))
            //añadimos la clase
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos()
        })
    });

} 