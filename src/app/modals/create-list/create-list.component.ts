import { Component, OnInit } from '@angular/core';
import {ListService} from '../../services/list.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  constructor(private listService: ListService) { }

  ngOnInit() {}

}
