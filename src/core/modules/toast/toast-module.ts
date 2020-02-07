import * as $ from 'jquery';
import { ToastOptions } from './toast-options';

export class ToastModule {
    private options: ToastOptions = null;

    public constructor(toastOptions?: ToastOptions) {
        this.options = {
            caption: toastOptions ? toastOptions.caption : ''
        };

        this.options.duration = toastOptions && toastOptions.duration ? toastOptions.duration : 2.5;
        this.options.height = toastOptions && toastOptions.height ? toastOptions.height : 6.25;
        this.options.width = toastOptions && toastOptions.width ? toastOptions.width : 12.5;
        this.options.entrance = toastOptions && toastOptions.entrance ? toastOptions.entrance : 'bounceInUp';
        this.options.exit = toastOptions && toastOptions.exit ? toastOptions.exit : 'bounceOutDown';
    }

    public set title(title: string) {
        this.options.caption = title;
    }

    public present(): void {
        // Make a div with some decorations
        const outerToastDiv: JQuery = $('<div>');
        outerToastDiv
            .css('height', this.options.height)
            .css('width', '100%')
            .css('position', 'absolute');
        const toastDiv: JQuery = $('<div>');
        toastDiv
            .css('height', this.options.height + 'em')
            .css('width', this.options.width + 'em')
            .css('position', 'relative')
            .css('bottom', '10%')
            .css('background-color', '#999')
            .css('margin', '0 auto')
            .addClass('animated')
            .addClass(this.options.entrance)
            .html(this.options.caption)
            .appendTo(outerToastDiv);
        outerToastDiv.appendTo($('body'));

        // Make it disapear after amount of time
        setTimeout(() => {
            outerToastDiv
                .removeClass('animated')
                .removeClass(this.options.entrance)
                .addClass('animated')
                .addClass(this.options.exit);
            console.log('removed entrance class');
            // Till animation finished
            setTimeout(() => {
                outerToastDiv.remove();
                console.log('Removed toast');
            }, 1500);
        }, this.options.duration * 1000);
    }
}