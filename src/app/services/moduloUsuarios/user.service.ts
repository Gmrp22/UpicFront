import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://34.195.25.223/usuarios/'
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  constructor(private http : HttpClient) {}
  
  
    getAllUsers() {
      const path = `${this.url}`;
      return this.http.get<User[]>(path);
    }
    async createUser(usuario: User) {
     console.log(usuario, "------Llega")
      // const path = `${this.url}`;
      // return this.http.post(path, usuario);
    }
    deleteUser(id: number) {
      const path = `${this.url}${id}`
      return this.http.delete<User>(path)
    }
  
}
