import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subject, Subscriber } from 'rxjs';
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

  //Initializes and creates an observable that notifies every time the user's authentication state changes
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
          console.log(user)
          let userInfo
          if(user.providerData[0]?.providerId=="google.com"){console.log("google")

          userInfo = {
            nombre: user?.displayName + '',
            email: user?.email + '',
            rol: 0,
            img: user?.photoURL,
          };
          this.user = userInfo;}
          
          else{
          userInfo = {
            nombre: user?.displayName + '',
            email: user?.email + '',
            rol: 0,
            img: user?.photoURL,
          };
          }


          subscriber.next(userInfo);
        } 
        
        
        
        
        
        
        
        
        
        else {
          this.logged = false;
          subscriber.next(false);
          console.log('NO Loggeado', this.logged);
          this.router.navigateByUrl('user/login');
        }
      });
    });
  }

  //Login with google account, if its a new user it will also send a post request of  the new user to the API
  loginGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((value) => {
        if (value.additionalUserInfo?.isNewUser) {
             //Sends the new user info
          let newUser = {
            nombre: value.user?.displayName + '',
            email: value.user?.email + '',
            rol: 0,
          };
          this.userService.createUser(newUser);
        }
        this.router.navigateByUrl('download/all-resource');
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }

  //Login with email
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

  //Signup with email, it will also send a post request of  the new user to the API
  // emailSignup(email: string, password: string) {
  //   this.auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((value) => {
  //       if (value.additionalUserInfo?.isNewUser) {
  //         //Sends the new user info
  //         let newUser = {
  //           nombre: value.user?.displayName + '',
  //           email: value.user?.email + '',
  //           rol: 0,
  //         };
  //         this.userService.createUser(newUser);
  //       }
  //       this.router.navigateByUrl('download/all-resource');
  //     })
  //     .catch((error) => {
  //       console.log('Something went wrong: ', error);
  //     });
  // }


  emailSignup(user : FormGroup) {
    let email = user.get('email')?.value
    let password = user.get('password')?.value
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        if (value.additionalUserInfo?.isNewUser) {
          //Sends the new user info
          let newUser = {
            nombre: user.get('name')?.value,
            email: email,
            rol: 0,
          };
          // value.additionalUserInfo.username = newUser.nombre
          this.userService.createUser(newUser).then( () => {
            this.router.navigateByUrl('download/all-resource');
          })
        }
       
      })
      .catch((error) => {
        console.log('Something went wrong: ', error);
      });
  }














  //Logout
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

  // userData(): Observable<firebase.User | null> | undefined {
  //   let u;
  //   this.auth.user.subscribe((user) => {
  //     if (user) {
  //       const t = user.getIdTokenResult();
  //       console.log(t);
  //       u = user;
  //       console.log("----", u)
  //     }
  //   });
  //   console.log("----", u)
  //   return u;
  // }

}
