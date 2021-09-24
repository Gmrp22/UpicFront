import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { UserInfo } from './userInfo';
import { UserService } from './user.service';
import { User } from './user.interface';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signedIn: Observable<any>;
  public logged: Boolean = false;
  public user: UserInfo | undefined;
  /**
   *Initializes and creates an observable that notifies
   *every time the user's authentication state changes
   */
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.signedIn = new Observable((subscriber) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          //Notify state, changes flag and sends user data
          this.logged = true;
          console.log('Loggeado', this.logged);
          subscriber.next(true);
          let userInfo = {
            nombres: user?.displayName + '',
            email: user?.email + '',
            rol: 0,
            img: user?.photoURL,
          };

          subscriber.next(userInfo);
        } else {
          this.logged = false;
          subscriber.next(false);
          console.log('NO Loggeado', this.logged);
          this.router.navigateByUrl('user/login');
        }
      });
    });
  }
  /**
   *Login with google account,
   *if its a new user it will also send a post request of  the new user to the API
   */
  loginGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((value) => {
        if (value.additionalUserInfo?.isNewUser) {
          //Sends the new user info
          let newUser = {
            nombres: value.user?.displayName + '',
            correo: value.user?.email + '',
            roles: [1],
          };
          this.userService.createUser(newUser).subscribe((newu) => {});
          this.router.navigateByUrl('download/all-resource');
        } else {
          this.router.navigateByUrl('download/all-resource');
        }
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }

  /**
   *Login with email
   */
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
  /**
   *Account creation
   */
  emailSignup(user: FormGroup) {
    let email = user.get('email')?.value;
    let password = user.get('password')?.value;
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        if (value.additionalUserInfo?.isNewUser) {
          //Sends the new user info
          let newUser = {
            nombres: user.get('name')?.value,
            correo: email,
            roles: [1],
          };
          value.user?.updateProfile({ displayName: newUser.nombres });

          this.userService.createUser(newUser).subscribe((newu) => {});

          this.router.navigateByUrl('download/all-resource');
        }
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }

  /**
   *Logs out
   */
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

  /**
   *Deactivates user
   */
  deactivate() {
    this.auth.currentUser
      .then((user) => {
        let email = user?.email + '';
        //Delete user from DB
        this.userService.deleteUser(email).subscribe((response) => {});
        user?.delete();
        this.router.navigateByUrl('user/login');
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }
}
