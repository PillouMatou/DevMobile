export class Todo {
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.isDone = false;
    }
    id: string;
    name: string;
    description: string;
    isDone: boolean;
}
