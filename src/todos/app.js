import html from './app.html?raw'


/**
 * 
 * @param {String} elementId 
 */

//llamo a la funcion, le mando el id.
export const App = (elementId) => {//y el id dice donde quiere que se renderice

    //Cuando la funcion app se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app)
    })();

}