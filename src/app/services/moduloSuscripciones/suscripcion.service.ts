import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  loadPlans(){
    this.httpc.get(this.ruta +'/planes/').pipe(map((response: any) => {
        this.planlist = response;      
        this.plansSubject.next(this.planlist);
    })).subscribe();
  }

  getPlans(){    
    if(this.planlist.length === 0){
      this.loadPlans();            
    }
    else {
      this.plansSubject.next(this.planlist);
    }
  }

  readDataPlans(): Observable<PlanItem[]> {
    return this.plansSubject.asObservable();
  }

  subscribe(s: SubscriptionItem) {
    const jsonParms = JSON.stringify(s);    
    const myheaders = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.httpc.post(this.ruta + '/suscripcion/', jsonParms, { headers: myheaders });
  }

  changeSubscription(s: SubscriptionItem){ //change this method
    const jsonParms = JSON.stringify(s);    
    const myheaders = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.httpc.put(this.ruta + '/suscripcion/' + s.usuarioId + '/', jsonParms, { headers: myheaders });
  }

  unSubscribe(userID: number){ //change this method
    return this.httpc.delete(this.ruta + '/suscripcion/' + userID + '/');
  }
  
  
}


