import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  ruta = environment.baseUrl;
  
  constructor(private http: HttpClient) {}

  charge(email:any, id:any){
    return this.http.post(this.ruta + '/pagos/', {
      //stripeToken: tokenId, //estoy es lo que pide el endpoint
      email: email,    //se cambiara
      payment_method_id: id
    })
  }
}
