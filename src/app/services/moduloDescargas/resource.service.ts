import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/api';
import { AuthService } from '../moduloUsuarios/auth.service';
import { gResource, Resource } from './interface/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  token: any;
  private url = `${baseUrl}${'recurso/'}`;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Acces-Control-Allow-Methods','*')
    .set('Access-Control-Allow-Origin', '*');

    constructor(private http: HttpClient, private auth: AuthService) {
      this.auth.userToken.subscribe((val) => {
        this.token = val;
      });
    }

  /**
   *Get all resources if its logged
   */
  getAllResources(logged: boolean) {
    const path = `${baseUrl}${'recursos/'}`;
    return this.http.get<gResource[]>(path);
  }
  /**
   *Get resources from a plan
   */
  getPlanResources(plan: number) {
    const path = `${baseUrl}${'recurso-plan/'}${plan}`;
    return this.http.get<gResource[]>(path);
  }
  /**
   *Create resource
   */
  uploadResource(resource: Resource) {
    const path = `${this.url}`;
    // var header =  new HttpHeaders({'Access-Control-Allow-Origin' :  '*'});
    var header =  new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.post(path, resource, { headers: header });
  }


  
 
}

