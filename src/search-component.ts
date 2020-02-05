import * as $ from 'jquery';
import { MovieService } from './services/movie-service';
import { MovieModel } from './models/movie-model';
import { RowComponent } from './components/row/row-component';
import { ManageCheckbox } from './manage-checkbox';

export class SearchComponent {
    private service: MovieService;

    public constructor() {
        this.service = new MovieService();

        this._setHandler();
    }

    private _setHandler(): void {
        $('[type="search"]').on(
            'keyup',
            (event: any): void => {
                const searchField: JQuery = $(event.target);
                if (searchField.val().toString().trim().length >= 2) {
                    // Call service...
                    this.service.getByTitle(searchField.val().toString().trim()).then((movies: MovieModel[]) => {
                        movies.forEach((movie: MovieModel, index: number) => {
                            const rowComponent: RowComponent = new RowComponent(movie);
                            rowComponent.load().then((row: JQuery) => {
                                $('tbody').append(row);
                            });
                        });
                        new ManageCheckbox();
                    });
                } else {
                    // Removes all previous rows
                    this._removeRows();
                } 
            }
        );

        $('[type="search"]').on(
            'search',
            (event: any): void => {
                this._removeRows();
            }
        );
    }

    private _removeRows(): void {
        $('tbody tr').remove();
    }
}