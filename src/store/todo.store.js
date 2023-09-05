import { Todo } from '../todos/models/todo.models';

//Filtros segun el estado de cada todo(task)
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}
//State o estado
const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del jade'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
    
}

const saveStateToLocalStorage = () => {
    
    localStorage.setItem('state', JSON.stringify(state))
}

//Nos permite filtrar los todos(task) segun su estado
const getTodos = ( filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid`)
    }
}

/**
 * Add new Task - Añade un nuevo task
 * @param {String} description  Receive the new task to add
 */
const addTodo = (description) => {
    if (!description) throw new Error(`Description is required`);
    state.todos.push(new Todo(description));
    saveStateToLocalStorage()
}

/**
 * 
 * @param {String} todoId TODO indentified
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done
        }
        return todo;
    })
    saveStateToLocalStorage()
}

/**
 * Elimina todo
 * @param {String} todoId TODO indentified
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage()
} 
//Elimina el todo(task) completado.
const deleteCompleted = (  ) => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage()
}
//Cambio del filtro
const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage()
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}