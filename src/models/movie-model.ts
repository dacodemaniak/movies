export class MovieModel {
    private _id: number;
    private _title: string;
    private _year:string;

    public get id(): number {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get year(): string {
        return this._year;
    }

    public deserialize(movie: any): MovieModel {
        //Object.assign(this, movie);

        this._id = movie.idMovie;
        this._title = movie.title;
        this._year = movie.year;

        return this;
    }
}