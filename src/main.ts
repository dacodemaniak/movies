import * as $ from 'jquery';

import { ManageCheckbox } from "./manage-checkbox";
import { SpinnerLoader } from "./spinner-loader";

/**
 * @name Main
 * @author Jean-Luc (jla.webprojet@gmail.com) - Jan. 2020
 * @version 1.0.0
 *  Entry point of the application
 */
class Main {
    public constructor(){
        const loader: SpinnerLoader = new SpinnerLoader();
        loader.present();

        const title: HTMLElement = document.querySelector('h1');
        title.innerHTML = 'Movies';
        
        // Load movies from backend
        $.ajax({
            url: 'http://localhost:8080/api/movie',
            method: 'get',
            dataType: 'json',
            success: (response: any[]) => {
                if (response.length) {
                    response.forEach((movie: any, index: number) => {
                        const tableRow: JQuery = $('<tr>');

                        const checkBoxDivider: JQuery = $('<td>');
                        const checkBox: JQuery = $('<input>');
                        checkBox
                            .attr('type', 'checkbox')
                            .addClass('check-row')
                            .appendTo(checkBoxDivider);

                        const titleDivider: JQuery = $('<td>');
                        titleDivider.html(
                            `${movie.title} - ${movie.year}`
                        );

                        const moreDivider: JQuery = $('<td>');
                        const icon: JQuery = $('<span>');
                        icon
                            .addClass('icon-plus')
                            .appendTo(moreDivider);

                        // Stack cells into row
                        tableRow
                            .append(checkBoxDivider)
                            .append(titleDivider)
                            .append(moreDivider);
                        
                        // Display new row in tbody
                        $('tbody').append(tableRow);
                    })
                    // Instanciation of ManageCheckbox
                    new ManageCheckbox();
                }
            },
            error: (xhr: any, error: any) => {
                console.log(`Something went wrong ${error}`);
            }
        });



        loader.dismiss();
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
