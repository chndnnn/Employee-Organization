import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  constructor(private snackBar: MatSnackBar) { }

  private messageSource = new BehaviorSubject(true)
  currentMessage = this.messageSource.asObservable();

  myDataFunction(data:any){
    this.messageSource.next(data)
  }
  openSnackBar(message: string, action: string, setTime?: undefined) {
    const time = setTime === undefined ? 3000 : setTime;
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackBarColor']
    });
  }
}
