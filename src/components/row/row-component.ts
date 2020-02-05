import * as $ from 'jquery';
import { MovieModel } from "./../../models/movie-model";

export class RowComponent {
    private movie: MovieModel;

    public constructor(movie: MovieModel) {
        this.movie = movie;
    }

    public load(): Promise<JQuery> {
        return new Promise<JQuery>((resolve) => {
            $.get(
                '/src/components/row/view/row.view.html',
                (view: any): void => {
                    const jqView: JQuery = $(view);
                    jqView.find('[title]').html(this.movie.title);
                    jqView.find('[more]')
                        .attr('data-rel', this.movie.id);
                    resolve(jqView);
                }
            )
        });

    }
}