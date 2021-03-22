import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { ListService } from '../../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../../modals/create-list/create-list.component';
import {Observable} from 'rxjs';
import {CreateOwnersComponent} from '../../modals/create-owners/create-owners.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private lists: Observable<any>;
  listsCollection: List;

  constructor(private listService: ListService, public modalController: ModalController) {
  }

  ngOnInit(){
    this.lists = this.listService.getAll();
    this.lists.subscribe(
        (list: List) => {this.listsCollection = list; },
        () => {console.log('petit soucis dans la page home'); },
        () => {console.log('fini'); }
    );
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    return await modal.present();
  }

  async openCreateOwner(){
    const modal = await this.modalController.create({
      component: CreateOwnersComponent,
    });
    return await modal.present();
  }

  delete(list: List){
    this.listService.delete(list);
  }
}
