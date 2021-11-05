import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  ruta = environment.baseUrl;
  
  constructor(private http: HttpClient) {}

  /* Register new payment method */
  charge(email:any, id:any, token: any){
    const myheaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'content-type': 'application/json'
    });
    return this.http.post(this.ruta + '/pagos/', {
      email: email,
      payment_method_id: id
    }, { headers: myheaders })
  }
}
