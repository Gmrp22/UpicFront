import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/api';
import { NotificationService } from '../notifications/notification.service';
import { Resource } from './interface/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private url = `${baseUrl}${'recurso/'}`;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', '*');
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  /**
   *Get all resources
   */
  getAllResources() {
    const path = '';
    return this.http.get<Resource[]>(path);
  }
  /**
   *Create resource
   */
  uploadResource(resource: Resource) {
    const path = `${this.url}`;
    return this.http.post(path, resource, { headers: this.headers });
  }
  /**
   *Download resource
   */
  downloadResource(email: String) {
    let url = `${baseUrl}${'delete-user/'}`;
    const path = `${url}${email}`;
    return this.http.delete<Resource>(path, { headers: this.headers });
  }
}
