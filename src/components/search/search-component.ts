import * as $ from 'jquery';
import { MovieService } from '../../services/movie-service';
import { MovieModel } from '../../models/movie-model';
import { RowComponent } from '../row/row-component';
import { ManageCheckbox } from '../../manage-checkbox';
import { SpinnerLoader } from './../../core/modules/spinner/spinner-loader';

export class SearchComponent {
    private service: MovieService;
    private movies: MovieModel[]; // State
    private spinner: SpinnerLoader;

    public constructor() {
        this.service = new MovieService();
        this.movies = new Array<MovieModel>();
        this.spinner = new SpinnerLoader();

        this._setHandler();
    }

    private _setHandler(): void {
        $('[type="search"]').on(
            'keyup',
            (event: any): void => {
                const searchField: JQuery = $(event.target);
                if (searchField.val().toString().trim().length >= 2) {
                    this.spinner.present();
                    // Call service...
                    this.service.getByTitle(searchField.val().toString().trim())
                    .then((movies: MovieModel[]) => {
                        if (!this._compareTo(movies)) {
                            this.movies = movies;
                            this._removeRows();
                            movies.forEach((movie: MovieModel, index: number) => {
                                const rowComponent: RowComponent = new RowComponent(movie);
                                rowComponent.load().then((row: JQuery) => {
                                    $('tbody').append(row);
                                });
                            });
                            new ManageCheckbox();
                        }
                    });
                    this.spinner.dismiss();
                } else {
                    // Removes all previous rows
                    this._removeRows();
                    this.movies = [];
                } 
            }
        );

        $('[type="search"]').on(
            'search',
            (event: any): void => {
                this._removeRows();
                this.movies = [];
            }
        );
    }

    private _removeRows(): void {
        $('tbody tr').remove();
    }

    private _compareTo(movies: Array<MovieModel>): boolean {
        let isEqual: boolean = false;

        const input: Array<MovieModel> = movies.slice().sort(MovieModel.compare);
        const state: Array<MovieModel> = this.movies.slice().sort(MovieModel.compare);

        if (state.length !== 0) {
            if (input.length === state.length) {
                state.forEach((stateMovie: MovieModel, index: number) => {
                    if (stateMovie.compareTo(input[index])) {
                        isEqual = true;
                    } else {
                        isEqual = false;
                    }
                });
            }
        }

        return isEqual;
    }
}