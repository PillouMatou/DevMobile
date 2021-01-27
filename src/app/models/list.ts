import {Todo} from './todo';

export class List {
    constructor(name: string) {
        this.name = name;
    }
    id: string;
    name: string;
    todos: Todo[];
}
