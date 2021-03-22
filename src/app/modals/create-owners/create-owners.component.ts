import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {List} from '../../models/list';
import {ModalController} from '@ionic/angular';
import {ListService} from '../../services/list.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-create-owners',
  templateUrl: './create-owners.component.html',
  styleUrls: ['./create-owners.component.scss'],
})
export class CreateOwnersComponent implements OnInit {

  @Input() list: List;
  private ownerForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,
              private listService: ListService, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.ownerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  get errorControl() {
    return this.ownerForm.controls;
  }

  share() {
    if (this.ownerForm.valid){
      this.firebaseAuth.currentUser
          .then(user => {
            this.list.owners.push(this.ownerForm.get('email').value);
          });
    }
  }
}
