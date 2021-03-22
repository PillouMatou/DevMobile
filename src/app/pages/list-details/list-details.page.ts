import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {Todo} from '../../models/todo';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private list: Observable<List>;
  listId: string;
  listsCollection: List;

  constructor(private listService: ListService,
              private modalController: ModalController,
              private route: ActivatedRoute) { }

  ngOnInit() {
  this.listId = this.route.snapshot.paramMap.get('listId');
  this.list = this.listService.getOne(this.listId);
  this.list.subscribe(c => {this.listsCollection = c; });
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        listId: this.listId
      }
    });
    return await modal.present();
  }

  delete(todo){
    this.listService.deleteTodo(todo, this.listId);
  }

  todoIsDoneChange(todo){
    todo.isDone = !todo.isDone;
    console.log(todo.isDone);
    this.listService.addTodo(todo, this.listId);
  }

}
