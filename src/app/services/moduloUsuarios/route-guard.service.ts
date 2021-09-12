import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor() { }
  canActivate() {
    console.log("AlwaysAuthGuard");
    return true;
  }
}

