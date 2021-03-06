import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../notifications/notification.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ResourceInterceptorService {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if((request.url== 'https://34.195.25.223:3000/recurso/') || (request.url== 'https://34.195.25.223:3000/recursos/') ||(request.url== 'https://34.195.25.223:3000/recurso-plan/')){
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (request.method == 'POST') {
          this.notificationService.fail('No es posible subir el recurso');
        }

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message;
          console.log('HTTP Error', errorMessage);
        } else {
          // server-side error
          errorMessage = error.message;
          console.log('HTTP Error', errorMessage);
        }
  
        return throwError(errorMessage);
      })
    );
  
  
  }

  else{
    return next.handle(request)
  }
  }
}
