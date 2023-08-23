import { Todo } from '../todos/models/todo.models';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}


const state = {
    todo: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra de marfil'),
        new Todo('Piedra de jade'),
    ],
    filter: Filters.All,
}