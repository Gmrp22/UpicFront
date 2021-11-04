import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlanItem } from 'src/app/models/planItem';
import { SubscriptionItem } from 'src/app/models/subscriptionItem';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  private planlist: PlanItem[];
  plansSubject = new Subject<PlanItem[]>();
  ruta = environment.baseUrl;

  constructor(public httpc: HttpClient) {
    this.planlist = [];
   }


   /*Se cargan los planes existentes en un array de tipo PlanItem*/
  loadPlans(){
    this.httpc.get(this.ruta +'/planes/').pipe(map((response: any) => {
        this.planlist = response;      
        this.plansSubject.next(this.planlist);
    })).subscribe();
  }

  /*Si ya se ha hecho la consulta, solo se devuelve el objeto, sino se llama a la consulta */
  getPlans(){    
    if(this.planlist.length === 0){
      this.loadPlans();            
    }
    else {
      this.plansSubject.next(this.planlist);
    }
  }

  /*Se devuelve un plan específico*/
  getPlan(id: number): Observable<any> {
    return this.httpc.get(this.ruta +'/planes/' + id);
  }

  /*Se devuelve el objeto que ya contiene los planes*/
  readDataPlans(): Observable<PlanItem[]> {
    return this.plansSubject.asObservable();
  }

  /*Se devuelve una suscripción según el email*/
  getSubscription(email: String): Observable<any>{ 
    const path = `${this.ruta}${'/suscripcion?email='}${email}`;
    return this.httpc.get(path)
  }

  /*Se cambia la sucripción*/
  changeSubscription(s: SubscriptionItem, planID: any){
    const jsonParms = JSON.stringify(s);    
    const myheaders = new HttpHeaders({
      'content-type': 'application/json'
    })
    return this.httpc.put(this.ruta + '/suscripcion/' + planID + '/', jsonParms, { headers: myheaders });
  }

  /*Se elimina la suscripción*/
  unSubscribe(userID: number){ //change this method
    return this.httpc.delete(this.ruta + '/suscripcion/' + userID + '/');
  }
  
  
}


