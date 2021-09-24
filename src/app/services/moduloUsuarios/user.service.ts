import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://34.195.25.223/usuarios/';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', '*');
  constructor(private http: HttpClient) {}
  // prueba@correo.com
  // .set('Access-Control-Allow-Headers', 'Content-Type')
  // .set('Access-Control-Allow-Methods', 'POST')

  /**
   *Get users
   */
  getAllUsers() {
    const path = `${this.url}`;
    return this.http.get<User[]>(path);
  }
  /**
   *Create user
   */
  createUser(usuario: User) {
    const path = `${this.url}`;
    return this.http.post(path, usuario, { headers: this.headers });
  }
  /**
   *Delete user by email
   */
  deleteUser(email: String) {
    let url = 'http://34.195.25.223/delete-user/';
    const path = `${url}${email}`;
    return this.http.delete<User>(path, { headers: this.headers });
  }
}
