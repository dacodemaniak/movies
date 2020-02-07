import * as $ from 'jquery';
import { ToastModule } from './../../core/modules/toast/toast-module';

export class WishListComponent {
    private readonly button: JQuery = $('#add-to-wish-list');
    private toaster: ToastModule;

    public constructor() {
        this._setHandlers();
        this.toaster = new ToastModule();
    }

    private _setHandlers(): void {
        this.button.on(
            'click',
            (event: any): void => {
                // Loop over selected movies and store it...
                // Use Collection of checked rows and pass it to a service

                // Adjust heart of toolbar if ever

                // Just show a toast...
                this.toaster.present();
            }
        )
    }
}