import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listsCollection: AngularFirestoreCollection<List>;

  constructor(private af: AngularFirestore, private authService: AuthService) {
    this.listsCollection = this.af.collection('lists');
  }

  getAll(){
    return this.af.collection('lists', ref => ref.where('owners', 'array-contains', this.authService.user$.getValue().email))
        .snapshotChanges()
        .pipe(
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
    list.owners.push(this.authService.user$.getValue().email);
    await this.listsCollection.doc(list.id).set({owners: list.owners, id: list.id, todos: list.todos, name: list.name });
    console.log('id list', list.id);
  }

  async addOwner(list: List){
    await this.listsCollection.doc(list.id).update({owners: list.owners});
    console.log('id list', list.id);
  }

  async delete(list){
    await this.listsCollection.doc<List>(list.id).delete();
  }

  async addTodo(todo: Todo, listId: string){
    console.log('id todo', listId);
    await this.listsCollection.doc<List>(listId).collection<Todo>('todos').doc(todo.id).set({
      id: todo.id,
      name: todo.name,
      description: todo.description,
      isDone: todo.isDone
    });
  }

  async deleteTodo(todo: Todo, listId: string){
    await this.listsCollection.doc<List>(listId).collection<Todo>('todos').doc<Todo>(todo.id).delete();
  }

  private convertSnapshotData<T>(actions) {
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data } as T;
    });
  }
}
