import todoStore, { Filters } from "../../store/todo.store";

let element;
/**
 * 
 * @param {String} elementId 
 */
export const renderPending = (elementId) => {
    
    //Si no existe el elemento..
    if (!element)
    element = document.querySelector(elementId);//Entonces que lo busque por el elementId
    //Si a un asi no existe
    if (!element) 
        throw new Error(`Element ${elementId} not found`) // entonces no se puede hacer ni renderizar nada y envia un error.
    
    //! Si existe, se queda ahi la referencia en el element y podemos seguir continuando el codigo
    element.innerHTML = todoStore.getTodos(Filters.Pending).length //esto regresa un arreglo al poner length nos dice cuantos hay pendientes.
}

/**
 * Esta funcion la importamos en el archivo barril y de ahi cambiamos el import por el export
 * luego lo importamos en nuestro archivo app.js
 * y en la funcion updatePedingCount llamamos a la funcion.
 */