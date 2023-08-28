
import { Todo } from "../models/todo.models";
import {createTodoHTML} from './create-todo-html'


/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {

    //TODO Referencia
    const element = document.querySelector(elementId);
    todos.forEach(todo => {
        element.append(createTodoHTML(todo))
    });
};