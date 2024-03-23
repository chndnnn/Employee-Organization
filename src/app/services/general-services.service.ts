import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  constructor() { }

  private messageSource = new BehaviorSubject(true)
  currentMessage = this.messageSource.asObservable();

  myDataFunction(data:any){
    this.messageSource.next(data)
  }
}
