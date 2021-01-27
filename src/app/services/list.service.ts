import { Injectable } from '@angular/core';
import {Todo} from '../models/todo';
import {List} from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  private list: List[];
  private listTodo: Todo[];

  getAll(): List[]{
    return this.list;
  }
  createList(newlist: List){
    this.list.push(newlist);
  }
  getOne(id: string): List{
    return this.list.find(l => l.id === id);
  }
  createTodoInList(todo: Todo){
    this.listTodo.push(todo);
  }
  delete(list: Todo){
    this.listTodo = this.listTodo.filter(l => l !== list);
  }
}
