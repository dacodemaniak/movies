import * as $ from 'jquery';
import { MovieModel } from './models/movie-model';

/**
 * @name ManageCheckbox
 * @author Aélion - Feb. 2020
 * @version 1.0.0
 *  Manage checkboxes of the movies / actors table
 */
export class ManageCheckbox {
    public constructor() {}

    public removeHandlers(): void {
        $('#select-deselect').off('click');
        $('tbody').off(
            'click',
            '.check-row'
        );
        console.log('handlers was removed');
    }

    public setHandlers(): void {
        $('#select-deselect').on(
            'click', // Event to listen to
            (event: any): void => {
                $('.check-row').prop('checked', $(event.target).prop('checked'));
                if ($(event.target).prop('checked')) {
                    $('#add-to-wish-list').removeAttr('disabled');
                } else {
                    $('#add-to-wish-list').attr('disabled', 'disabled');
                }
            }
        );

        $('tbody').on(
            'click',
            '.check-row',
            (event: any): void => {
                console.log('Movie was checked or unchecked');
                const isChecked: boolean = $('.check-row:checked').length === $('.check-row').length;
                $('#select-deselect').prop('checked', isChecked);
                
                // if any was selected
                if ($(event.target).prop('checked')) {
                    $('#add-to-wish-list').removeAttr('disabled');
                } else {
                    if ($('.check-row:checked').length)
                        $('#add-to-wish-list').removeAttr('disabled');
                    else
                        $('#add-to-wish-list').attr('disabled', 'disabled');
                }
            }
        );
        console.log('handlers was set');
    }
}