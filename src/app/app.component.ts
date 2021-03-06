import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { DbService } from './db.service';
import { adminEmails } from './admin-users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routeSections;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  user: any = null;
  admin: boolean = false;

  constructor(private router: Router, private auth: AuthService, private db: DbService) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.routeSections = event['url'].split('/').filter(route => (route));
    });

    this.auth.getCurrentUser()
    .takeUntil(this.ngUnsubscribe).subscribe(user=>{
      this.user = user;
      if (this.user) {
        adminEmails.forEach(email => { this.user.email == email ? this.admin = true : null; });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logoClick() {
    if (this.user) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.auth.logout();
  }
}
