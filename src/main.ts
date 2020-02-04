/**
 * @name Main
 * @author Jean-Luc (jla.webprojet@gmail.com) - Jan. 2020
 * @version 1.0.0
 *  Entry point of the application
 */
class Main {
    public constructor(){
        const title: HTMLElement = document.querySelector('h1');
        title.innerHTML = 'Movies';
    }
}

// Main app instanciation
document.addEventListener(
    'DOMContentLoaded', // Event to listen...
    () => { // What to do when event is triggered
        console.log('Hey Buddy, i\'m ready... play now !');
        new Main();
    }
);
