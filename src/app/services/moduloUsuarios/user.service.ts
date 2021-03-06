import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from './interface/user.interface';
import { baseUrl } from 'src/environments/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../notifications/notification.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${baseUrl}${'usuarios/'}`;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', '*');
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}
  // prueba@correo.com
  // .set('Access-Control-Allow-Headers', 'Content-Type')
  // .set('Access-Control-Allow-Methods', 'POST')

  /**
   *Get users
   */
  getAllUsers() {
    const path = ""
    return this.http.get<User[]>(path);
  }
  /**
   *Create user
   */
  createUser(usuario: User) {
    const path = `${this.url}`;
    return this.http.post(path, usuario)
  
  }
  /**
   *Delete user by email
   */
  deleteUser(email: String) {
    let url = `${baseUrl}${'user/'}`;
    const path = `${url}${email}`;
    return this.http.delete<User>(path);
  }


}
