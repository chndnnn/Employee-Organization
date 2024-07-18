import { Component, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpServicesService } from '../../services/http-services.service';
import { DatePipe } from '@angular/common';
import { GeneralServicesService } from '../../services/general-services.service';
import { SelectionChangedEvent } from 'ag-grid-community';
import { SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-emp-registration',
  standalone: true,
  imports: [MatInputModule, DatePipe,MatProgressSpinnerModule, HttpClientModule, AgGridAngular, MatIconModule, MatExpansionModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FormsModule, ReactiveFormsModule, MatCardModule],
  providers: [HttpServicesService, DatePipe],
  templateUrl: './emp-registration.component.html',
  styleUrl: './emp-registration.component.css',

})
export class EmpRegistrationComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  registrationForm: FormGroup;
  isDeleteButtonEnabled: boolean = false;
  public rowSelection: "multiple" | "single" | undefined = 'multiple';
  public autoSizeStrategy: SizeColumnsToFitGridStrategy | undefined = { type: 'fitGridWidth' };
  empid: any[] = [];
  selectedRows: any[] = [];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  constructor(private fb: FormBuilder, private HttpServicesService: HttpServicesService, private datePipe: DatePipe, private GeneralServicesService: GeneralServicesService) {
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{1,4}(-?[0-9]{1,12})?$')]],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getAllEmployee();
  }
   isPanelOpen = false;
  // toggleExpansionPanel() {
  //   this.isPanelOpen = !this.isPanelOpen;
  // }
  rowHeight = 30;
  rowData = [];

  colDefs: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerName: '',
      pinned: 'left',
      width: 40
    },
    { field: 'emp_id', headerName: 'Emp Id' },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phoneNumber', headerName: 'Phone Number' },
    { field: 'birthDate', headerName: 'Birth Date', cellRenderer: this.formatBirthDate.bind(this) },
    { field: 'gender', headerName: 'Gender' },
    { field: 'location', headerName: 'Location' },
    { field: 'designation', headerName: 'Designation' },
    //{ field: 'password', headerName: 'Password' },
  ];


  formatBirthDate(params: any): string {
    if (params.value !== null && params.value !== undefined) {
      return this.datePipe.transform(params.value, 'dd-MM-yyyy') || '';
    }
    return '';
  }
  onSelectionChanged(event: any) {
    this.selectedRows = event.api.getSelectedRows(); // Get currently selected rows
    if (this.selectedRows.length>0) {
      this.isDeleteButtonEnabled = true;
    }
    else {
      this.isDeleteButtonEnabled = false;
    }
  }

  isSelected(row: any): boolean {
    return this.selectedRows.findIndex(selectedRow => selectedRow.id === row.id) !== -1;
  }


  onSave() {
    if (this.registrationForm.valid) {
      Swal.fire({
        title: "Do you want to save the Details?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          this.HttpServicesService.addEmployee(this.registrationForm.value).subscribe(
            response => {
              if(response){
                Swal.fire({
                  text: "Employee Registration is sucessful and Details sent to E-mail",
                  icon: "success"
                });
                this.registrationForm.reset();
                this.getAllEmployee();
               
              }else{
                this.GeneralServicesService.openSnackBar('Error adding employee.', '');
              }
              
            }, error => {
              this.GeneralServicesService.openSnackBar('Error adding employee.', '');
            }
            )
          //Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      this.GeneralServicesService.openSnackBar('Invalid form data. Please check again.','');
    }
  }

  clear() { this.registrationForm.reset(); }

  refreshPage() {window.location.reload();}

  getAllEmployee() {
    this.HttpServicesService.fetchAllEmp().subscribe(
      (response: any) => {
        if (response instanceof HttpErrorResponse) {
          console.error('Error occurred:', response.error);
        } else {
          this.rowData = response.data;
        }
      },
      (error: any) => {
        console.error('Error occurred:', error);
      }
    );
  }


  deleteEmp() {
    const isDelete = this.selectedRows.map(row => row.emp_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  
    }).then((result) => {
      if (result.isConfirmed) {
        this.HttpServicesService.deleteEmployee(isDelete).subscribe((response: any) => {
          if (response) {
            this.GeneralServicesService.openSnackBar('Employee Deleted!.', '');
            this.getAllEmployee();
          } (error: any) => {
            this.GeneralServicesService.openSnackBar('Error adding employee.', '');
          }
    
        })
      }
    });
   

  }
}



