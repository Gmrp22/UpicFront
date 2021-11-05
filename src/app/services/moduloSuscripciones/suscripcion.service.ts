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


   /* Existing plans are loaded into an array of type PlanItem */
  loadPlans(){
    this.httpc.get(this.ruta +'/planes/').pipe(map((response: any) => {
        this.planlist = response;      
        this.plansSubject.next(this.planlist);
    })).subscribe();
  }

  /* If the query has already been done, only the object is returned, otherwise the query is called */
  getPlans(){    
    if(this.planlist.length === 0){
      this.loadPlans();            
    }
    else {
      this.plansSubject.next(this.planlist);
    }
  }

  /* A specific plan is returned */
  getPlan(id: number): Observable<any> {
    return this.httpc.get(this.ruta +'/planes/' + id);
  }

  /* The object that already contains the plans is returned */
  readDataPlans(): Observable<PlanItem[]> {
    return this.plansSubject.asObservable();
  }

  /* A subscription is returned according to the email */
  getSubscription(email: String): Observable<any>{ 
    const path = `${this.ruta}${'/suscripcion?email='}${email}`;
    return this.httpc.get(path)
  }

  /* Subscription is changed */
  changeSubscription(s: SubscriptionItem, planID: any){
    const jsonParms = JSON.stringify(s);    
    const myheaders = new HttpHeaders({
      'content-type': 'application/json'
    })
    return this.httpc.put(this.ruta + '/suscripcion/' + planID + '/', jsonParms, { headers: myheaders });
  }

  /* Subscription is removed */
  unSubscribe(planID: number, token: any){
    const myheaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'content-type': 'application/json'
    });
    return this.httpc.put(this.ruta + '/cancelar-suscripcion/' + planID + '/', '', { headers: myheaders });
  }
  
  
}


