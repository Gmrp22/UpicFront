import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { UserInfo } from './userInfo';
import { UserService } from './user.service';
import { User } from './user.interface';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../notifications/notification.service';
import { HttpResponse } from '@angular/common/http';
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
    private userService: UserService,
    private notificationService: NotificationService
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
    this.auth.signInWithCustomToken;
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
          this.userService.createUser(newUser).subscribe(
            (res) => {
              console.log('HTTP response', res);
              this.notificationService.success2('Cuenta creada');
            },
            (err) => {
              console.log('HTTP Error', err);
              this.notificationService.fail('Cuenta no creada');
            },
            () => console.log('HTTP request completed.')
            
          );
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

          this.userService.createUser(newUser).subscribe(
            (res) => {
              console.log('HTTP response', res);
              this.notificationService.success2('Cuenta creada');
            },
            (err) => {
              console.log('HTTP Error', err);
              this.notificationService.fail('Cuenta no creada');
            },
            () => console.log('HTTP request completed.')
            
          );

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
    this.notificationService.loading();
    this.notificationService.exitLoading(1000);
    setTimeout(() => {
      this.auth.signOut().catch((error) => {
        console.log('Something went wrong: ', error);
        this.notificationService.error('No se pudo cerrar sesión');
      });
    }, 1000);
  }

  /**
   *Deactivates user
   */
  deactivate() {
    this.notificationService.loading();
    this.auth.currentUser
      .then((user) => {
        let email = user?.email + '';
        //Delete user from DB
        this.notificationService.exitLoading(1000);
        this.userService
          .deleteUser(email)
          .subscribe(
          (res) => {
            console.log('HTTP response', res);
            this.notificationService.success('Cuenta desactivada');
            user?.delete();
            this.logout();
          },
          (err) => {
            console.log('HTTP Error', err);
            this.notificationService.error(
              'No se ha podido desactivar su cuenta'
            );
          },
          () => console.log('HTTP request completed.')
          );
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }
}
