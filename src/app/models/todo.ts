export class Todo {
    constructor(name){
        this.id = Math.floor(Math.random() * 10000000000).toString() + Date.now().toString();
        this.name = name;
        this.isDone = false;
    }

    id: string;
    name: string;
    isDone: boolean;
}
