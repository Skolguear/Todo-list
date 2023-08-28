import { Todo } from '../todos/models/todo.models';

//Filtros segun el estado de cada todo(task)
const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}
//State o estado, tiene un array de objetos intanciados con los datos que tendra cada todo(task) y el filtro
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
    console.log(state);
    console.log('InitStore 🥑');
}

const loadStore = () => {
    throw new Error('Not implemented');
    
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
}

/**
 * 
 * @param {String} todoId TODO indentified
 */
const toggleTodo = ( todoId ) =>{
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done
        }
        return todo;
    })
}

/**
 * 
 * @param {String} todoId TODO indentified
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    
} 
//Elimina el todo(task) completado.
const deleteCompleted = (  ) => {
    state.todos = state.todos.filter(todo => todo.done);
}

const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter;
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