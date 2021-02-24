import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login: FormGroup;
  public withEmail: boolean;

  constructor( private formBuilder: FormBuilder,
               private toastController: ToastController, private route: Router,
               private auth: AuthService) {
    this.withEmail = false;
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


  async loginForm(){
    if (this.login.valid) {
      try {
        await this.auth.login(this.login.get('email').value,
            this.login.get('password').value);
        this.route.navigate(['home']);
      } catch (e) {
        const toast = await this.toastController.create({
          color: 'danger',
          duration: 2000,
          message: e.message
        });

        await toast.present();
      }
    }
  }
}
