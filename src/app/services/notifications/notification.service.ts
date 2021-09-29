import { Injectable } from '@angular/core';
import { Notify, Report, Confirm, Loading, Block } from 'notiflix';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  success(message: string){
    Notify.success(message, { timeout: 1000 });
  }
  success2(message: string){
   Report.success( message, 
    '', 
    'Click' ); 
  }
  fail(message: string){
    Report.failure( message, 
      '', 
      'Click' ); 
  }
  error(message: string){
    Notify.failure(message, { timeout: 1000 });
  }
  loading(){
    Block.hourglass('body');
  }
  exitLoading(timeout: number){
    Block.remove('body', timeout)
  }
}
