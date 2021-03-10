import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private list: Observable<List>;
  private listsCollection: List;

  constructor(private listService: ListService,
              private modalController: ModalController,
              private route: ActivatedRoute) { }

  ngOnInit() {
  const listId = this.route.snapshot.paramMap.get('listId');
  this.list = this.listService.getOne(listId);
  this.list.subscribe(
      (list: List) => {this.listsCollection = list; },
      () => {console.log('petit soucis dans la page list-details'); },
      () => {console.log('fini'); }
  );
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        listId: this.listsCollection.id
      }
    });
    return await modal.present();
  }

  delete(todo){
    this.listService.deleteTodo(todo, this.listsCollection.id);
  }

}
