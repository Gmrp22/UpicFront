import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { User } from './user.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signedIn: Observable<any>;
  constructor(private auth: AngularFireAuth, private router: Router) {
   this.signedIn = new Observable(subscriber => {
      this.auth.onAuthStateChanged(user => {
        if(user){
          console.log("Loggeado")
        }
        else{
          this.router.navigateByUrl('user/login');
        }
      }
        )

    })
  }

  loginGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((value) => {
        // this.logout()
        this.router.navigateByUrl('download/all-resource');
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }

  loginEmail(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.router.navigateByUrl('download/all-resource');
      })
      .catch((err) => {
        console.log('Something went wrong: ', err.message);
      });
  }

  emailSignup(email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        this.router.navigateByUrl('download/all-resource');
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }
  logout() {
    this.auth
      .signOut()
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
