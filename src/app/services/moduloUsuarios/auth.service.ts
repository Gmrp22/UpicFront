import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { UserInfo } from './interface/userInfo';
import { UserService } from './user.service';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../notifications/notification.service';
import { subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signedIn: Observable<any>;
  public logged: Boolean = false;
  public user: UserInfo | undefined;
  public userToken :Observable<any>;
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
          user.getIdToken().then(a => console.log(a))
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
          // this.router.navigateByUrl('user/login');
        }
      });
    });
    this.userToken = new Observable((subscriber) =>{
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          //send token
          let token = ""
         user.getIdToken().then(a => {token = a; subscriber.next(token)})
        } else {
          subscriber.next(false);
         
        }
    })
  })

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
            roles: 1,
          };
          this.userService.createUser(newUser).subscribe(
            (res) => {
              console.log('HTTP response', res);
              this.notificationService.success2('Bienvenido a Upic');
              this.router.navigateByUrl('download/all-resource');
            },

            (err) => {
              console.log('HTTP response', err);
              value.user?.delete();
              this.router.navigateByUrl('download/all-resource');
            }
          );
       
        } else {
          this.router.navigateByUrl('download/all-resource');
        }
      })
      .catch((err) => {
        let error = this.getFirebaseErrorMessage(err);
        this.notificationService.fail(error);
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
        let error = this.getFirebaseErrorMessage(err);
        this.notificationService.fail(error);
      });
  }
  /**
   *Account creation
   */
  emailSignup(user: FormGroup) {
    let email = user.get('email')?.value;
    email = email.toLowerCase()
    let password = user.get('password')?.value;
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        if (value.additionalUserInfo?.isNewUser) {
          //Sends the new user info
          let newUser = {
            nombres: user.get('name')?.value,
            correo: email,
            roles: 1,
          };
          value.user?.updateProfile({ displayName: newUser.nombres });

          this.userService.createUser(newUser).subscribe(
            (res) => {
              console.log('HTTP response', res);
              this.notificationService.success2('Bienvenido a Upic');
              this.router.navigateByUrl('download/all-resource');
            },
            (err) => {
              console.log('HTTP response', err);
              value.user?.delete();
            }
          );
        }
      })
      .catch((err) => {
        let error = this.getFirebaseErrorMessage(err);
        this.notificationService.fail(error);
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
    this.router.navigateByUrl('user/login');
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
        this.notificationService.exitLoading(1500);
        this.userService.deleteUser(email).subscribe((res) => {
          this.notificationService.success('Cuenta desactivada');
          user?.delete();
          // this.logout();
          this.router.navigateByUrl('download/all-resource');
        });
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }

  /**
   *Error message
   */
  private getFirebaseErrorMessage(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con este email.';
        break;
      case 'auth/weak-password':
        return 'La contraseña debe de contener mas de seis caracteres.';
        break;
      case 'auth/wrong-password':
        return 'Combinación incorrecta.';
        break;
      case 'auth/user-not-found':
        return 'No existe esta cuenta.';
        break;

      case 'auth/user-disabled':
        return 'La cuenta ha desactivada.';
        break;

      case 'auth/operation-not-allowed':
        return 'Error';
        break;

      case 'auth/operation-not-allowed':
        return 'Error en el servidor, vuelva a intentar';
        break;

      case 'auth/invalid-email':
        return 'Email no valido';
        break;
      case 'auth/too-many-requests':
        return 'Demasiados intentos, pruebe mas tarde';
      default:
        return 'Fallo de inicio de sesión';
    }
  }
}
