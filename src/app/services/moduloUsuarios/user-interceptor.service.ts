import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { NotificationService } from '../notifications/notification.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserInterceptorService implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if((request.url== 'http://34.195.25.223/usuarios/')||(request.url== 'http://34.195.25.223/delete-user/')){
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(request.method == 'POST'){
          this.notificationService.fail('No es posible crear la cuenta');
        }
        if(request.method == 'DELETE'){
          this.notificationService.fail('No es posible desactivar la cuenta');
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
        
        return throwError(errorMessage)
      })
    );
    }
    else{
      return next.handle(request)
    }
  }
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
