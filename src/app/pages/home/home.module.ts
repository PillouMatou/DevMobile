import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CreateListComponent } from '../../modals/create-list/create-list.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {CreateOwnersComponent} from '../../modals/create-owners/create-owners.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [HeaderComponent],
  declarations: [HomePage, CreateListComponent, CreateOwnersComponent]
})
export class HomePageModule {}
