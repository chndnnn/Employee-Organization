import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { KeycloakService } from '../../services/keycloak.service';
import { HttpServicesService } from '../../services/http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule,MatButtonModule,MatCardModule,MatDividerModule,AgGridAngular],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm: FormGroup;
  username:string = '' ;
  fullName:string='';
  keyAuth : any ;
 // rowData:any;
  constructor(private fb: FormBuilder,private keycloakService: KeycloakService,private HttpServicesService: HttpServicesService,){}

 ngOnInit(){
  this.loginForm=this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
      })
  try {
   this.keyAuth= this.keycloakService;
   console.log(this.keyAuth);
  this.username = this.keyAuth.keycloak.tokenParsed.preferred_username;
  this.fullName = this.keyAuth.keycloak.tokenParsed.given_name;

  } catch (error) {
    console.error('Error during Keycloak initialization:', error);
  }
  if(this.fullName){
    this.getAllUserTasks(this.fullName)
  }
}

  rowHeight = 30;
  rowData = [];

  colDefs: ColDef[] = [
    { field: 'taskid', headerName: 'Task Id' },
    { field: 'assignedTo', headerName: 'Assigned user' },
    { field: 'taskname', headerName: 'Task' },
    { field: 'taskdesc', headerName: 'Description' },
    { field: 'priority', headerName: 'Priority' },
    { field: 'assignedAt', headerName: 'Assigned On' },
    { field: 'createdAt', headerName: 'Created On' },
  ]

getAllUserTasks(userName: any): void {
  this.HttpServicesService.getAllAssignTaskForUser(userName).subscribe(
    (response: any) => {
      if (response.status === "success") {
        this.rowData = response.data; 
      } else {
        console.error('Error occurred:', response); 
      }
    },
    (error: any) => {
      if (error instanceof HttpErrorResponse) {
        console.error('HTTP error occurred:', error.error);
      } else {
        console.error('Error occurred:', error); 
      }
    }
  );
}



}
