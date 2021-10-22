import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/api';
import { Resource } from './interface/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private url = `${baseUrl}${'recurso/'}`;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  /**
   *Get all resources if its logged
   */
  getAllResources(logged: boolean) {
    const path = `${baseUrl}${'recursos/'}`;
    return this.http.get<Resource[]>(path);
  }
  /**
   *Get resources from a plan
   */
  getPlanResources(plan: number) {
    const path = `${baseUrl}${'recurso-plan/'}${plan}`;
    return this.http.get<Resource[]>(path);
  }
  /**
   *Create resource
   */
  uploadResource(resource: Resource) {
    const path = `${this.url}`;
    return this.http.post(path, resource, { headers: this.headers });
  }
 
}
