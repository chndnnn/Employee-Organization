import { Component, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-emp-registration',
  standalone: true,
  imports: [MatInputModule,AgGridAngular,MatIconModule,MatExpansionModule,MatButtonModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,FormsModule,ReactiveFormsModule,MatCardModule],
  templateUrl: './emp-registration.component.html',
  styleUrl: './emp-registration.component.css'
})
export class EmpRegistrationComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{1,4}(-?[0-9]{1,12})?$')]],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }

  isPanelOpen = false;


  toggleExpansionPanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
  colDefs: ColDef[] = [
    { field: "First Name" },
    { field: "Last Name" },
    { field: "E-mail" },
    { field: "Phone" },
    { field: "DOB" },
    { field: "Gender" },
    { field: "Location" },
    {field: "Designation" }
  ];

}
