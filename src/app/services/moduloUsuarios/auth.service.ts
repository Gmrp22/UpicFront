import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  loginGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((value) => {
        this.router.navigateByUrl('download/all-resource');
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }
  logout() {
    this.auth.signOut()
    .then((value) => {
      this.router.navigateByUrl('user/login');
    })
    .catch((error) => {
      console.log('Something went wrong: ', error);
    });
  }










  userData(): Observable<firebase.User | null> | undefined {
    let u;
    this.auth.user.subscribe((user) => {
      if (user) {
        const t = user.getIdTokenResult();
        console.log(t);
        u = user;
      }
    });
    return u;
  }

  getUserdatas() {
    this.auth.user.subscribe((user) => {
      if (user) {
        const t = user.email;
        console.log(t);
      }
    });
  }
}