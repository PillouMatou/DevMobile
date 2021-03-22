import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public title: string;
  public user: firebase.default.User;

  private route: Observable<import('node_modules/@angular/router/router').Event>;

  constructor(private auth: AuthService , private router: Router, private listService: ListService) {
    this.route = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
  }

  ngOnInit() {
this.auth.getConnectedUser().subscribe(user => this.user = user);

this.route.subscribe(route => {

      // @ts-ignore
      const url = route.url;
      switch (url.split('/')[1]) {
        case 'home':
          this.title = 'Listes';
          break;
        case 'login':
          this.title = 'Se connecter';
          break;
        case 'register':
          this.title = 'Créer un compte';
          break;
        case 'mdp-retrieve':
          this.title = 'Mot de passe oublié';
          break;
          case 'list-details':
            const list = this.listService.getOne(url.split('/')[2]);
            this.title = 'TODO liste';
            break;
        default:
          console.log(`Unknown url ${url}.`);
      }
    });
  }

  async loginOrOut(){
    if (this.user) {
      await this.auth.logout();
    }
    this.router.navigate(['login']);
  }
}
