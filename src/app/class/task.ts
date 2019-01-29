
import {List} from './list';

export class Task {
    _id: string;
    title: String;
    description: string;
    date: Date;
    done: Boolean;
    list: List;
    constructor(t: String , des: string, d: Date, l: List) {
        this.title = t;
        this.description = des;
        this.date = d;
        this.done = false;
        this.list = l;
    }
}
