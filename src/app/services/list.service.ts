import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listsCollection: AngularFirestoreCollection<List>;

  constructor(private af: AngularFirestore) {
    this.listsCollection = this.af.collection('lists');
  }

  getAll(){
    return this.listsCollection.snapshotChanges().pipe(
        map(actions => this.convertSnapshotData<List>(actions)));
  }

  getOne(id: string){
    return this.listsCollection.doc<List>(id).valueChanges().pipe(switchMap(list =>
    this.listsCollection.doc(id).collection<Todo>('todos').snapshotChanges().pipe(
        map(actions => {
          list.todos = this.convertSnapshotData<Todo>(actions);
          return list;
        })
    )));
  }

  async create(list: List){
    await this.listsCollection.doc(list.id).set({id: list.id, todos: list.todos, name: list.name });
    console.log(list.id);
  }

  async delete(list){
    await this.listsCollection.doc<List>(list.id).delete();
  }
/*
  async addTodo(todo: Todo, listId: string){
    await this.listsCollection.doc<List>(listId).collection<Todo>('todos').add({
      id: todo.id,
      name: todo.name,
      description: todo.description,
      isDone: todo.isDone
    });
  }

  async deleteTodo(todo: Todo, listId: string){
    await this.listsCollection.doc<List>(listId).collection<Todo>('todos').doc<Todo>(todo.id).delete();
  }
*/
  private convertSnapshotData<T>(actions) {
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data } as T;
    });
  }
}
