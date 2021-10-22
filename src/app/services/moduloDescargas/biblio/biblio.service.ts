import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/api';
import { AuthService } from 'src/app/services/moduloUsuarios/auth.service';
import { Biblio } from '../interface/biblio';
@Injectable({
  providedIn: 'root',
})
export class BiblioService {
  private url = `${baseUrl}${'add-recurso-biblio/'}`;
  token: any;
  headers = new HttpHeaders();

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.userToken.subscribe((val) => {
      this.token = val;
      this.headers.append('Authorization', 'Bearer ' + this.token);
    });
  }
  /**
  Adds resource to biblio
   */
  saveResource(id: number) {
    const path = `${this.url}`;
    var header =  new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.post(path, {recurso:id},{headers:header});
  }

  /**
  Gets the biblio resources by user
   */
  getBiblioResource() {
    let path = `${baseUrl}${'biblioteca/'}`;
    var header =  new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.get<Biblio[]>(path, {headers:header});
  
}

}
