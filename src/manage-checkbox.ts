import * as $ from 'jquery';

/**
 * @name ManageCheckbox
 * @author Aélion - Feb. 2020
 * @version 1.0.0
 *  Manage checkboxes of the movies / actors table
 */
export class ManageCheckbox {
    public constructor() {
        this._setHandlers();
    }

    private _setHandlers(): void {
        $('#select-deselect').on(
            'click', // Event to listen to
            (event: any): void => {
                $('.check-row').prop('checked', $(event.target).prop('checked'));
            }
        );

        $('tbody').on(
            'click',
            '.check-row',
            (event: any): void => {
                const isChecked: boolean = $('.check-row:checked').length === $('.check-row').length;
                $('#select-deselect').prop('checked', isChecked);
            }
        )
    }
}