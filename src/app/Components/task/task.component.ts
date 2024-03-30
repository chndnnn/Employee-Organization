import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpServicesService } from './../../services/http-services.service';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphsComponent } from "../graphs/graphs.component";
import { AssignGraphComponent } from "../graphs/assign-graph/assign-graph.component";
import { GeneralServicesService } from '../../services/general-services.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers: [HttpServicesService],
  imports: [MatIconModule, MatTableModule, CommonModule, HttpClientModule, FormsModule, GraphsComponent, AssignGraphComponent]
})
export class TaskComponent implements OnInit{

  constructor(private http: HttpServicesService, private service: GeneralServicesService) {
    this.service.currentMessage.subscribe((message) => {
      this.sideNavOnOrOff = message
    })
  }

  fetchTaskData() {
    this.http.fetchTaskData().subscribe((res) => {
      this.data1 = res;
      this.dataSource = this.data1.data;
      this.taskCount = this.dataSource.length
      // console.log(this.taskCount)
    })
  }

  fetchAllAssignedTask() {
    this.http.fetchAllAssignedTAsk().subscribe((res) => {
      this.allAssignedTask = res;
      this.dataSource1 = this.allAssignedTask.data
      this.assigneTtaskCount = this.dataSource1.length
    })
  }
  ngOnInit(): void {
    this.fetchTaskData();

    this.http.fetchAllEmp().subscribe((res) => {
      this.data3 = res;
      this.AllEmpData = this.data3.data;
    })

    this.fetchAllAssignedTask();


  }

  @ViewChild('checkboxRef') checkboxRef!: ElementRef;

  task: any;
  assignedClick: any = false;
  data1: any;
  displayedColumns: string[] = ['checkbox', 'taskid', 'taskname', 'taskdesc', 'priority', 'createdAt', 'Action'];
  dataSource = [{}];
  displayedColumns1: string[] = ['taskid', 'taskname', 'taskdesc', 'priority', 'createdAt', 'assignedAt', 'assignedTo'];
  dataSource1 = [];
  data2: any;
  DistinctEmpDesc: any;
  data3: any;
  allAssignedTask: any;
  AllEmpData: any;
  TabName: string = 'task';
  empName: any;
  sideNavOnOrOff: any;
  taskCount: number;
  assigneTtaskCount: number;
  selectedRows: any[] = [];
  enableEditing: boolean = false;
  enableDeleting: boolean = false;
  letElementData : any ;
  editButtonClick : boolean = false ;
  editedTakname : any ;
  editedTakDesc : any ;
  editedPriority : any ;
  showSave : boolean = true ;


  onButtonClick(data: any) {
    if(data.iseditable1){
        let Data = {
         taskname : this.editedTakname,
         taskdesc : this.editedTakDesc,
         priority : this.editedPriority
        }

        this.http.createTaskData(Data).subscribe((res)=>{
          this.http.updateSerialNumber('123').subscribe((res)=>{

          })
          this.fetchTaskData();
          this.editButtonClick = false
          this.enableEditing = false
          this.enableDeleting = false
          this.selectedRows = [];
          alert('Task create succesfully')
        })
    }else{
    this.assignedClick = true
    this.task = data
    console.log(this.sideNavOnOrOff)
    this.http.fetchDistinctEmpDesc().subscribe((res) => {
      this.data2 = res
      this.DistinctEmpDesc = this.data2.data
      console.log(this.DistinctEmpDesc)
    })
  }
  }

  onselectChange(data: any) {
    if (data.target.value != 'select') {
      let data1 = {
        "designation": data.target.value
      }

      this.http.fetchEmpByDesc(data1).subscribe((res) => {
        this.data3 = res;
        this.AllEmpData = this.data3.data
        console.log(this.AllEmpData)
      })
    } else {
      this.http.fetchAllEmp().subscribe((res) => {
        this.data3 = res;
        this.AllEmpData = this.data3.data;
      })
    }

  }

  onAssignClick() {

    if (this.empName) {

      let Data = {
        "assignedTo": this.empName,
        "taskid": this.task.taskid,
        "taskdesc": this.task.taskdesc,
        "taskname": this.task.taskname,
        "priority": this.task.priority,
        "createdAt": this.task.createdAt
      }

      console.log(Data)
      let id1 = this.task.taskid * 1
      this.http.sendAssignedTask(Data).subscribe((res) => {
        this.fetchAllAssignedTask();
        alert(`task assigned to ${this.empName}`)
      })

      this.http.deleteTask(id1).subscribe((res) => {
        this.fetchTaskData();
      });

      this.assignedClick = false
    } else {
      alert('Please select assiged name')
    }
  }

  onEmployeeChange(data: any) {
    this.empName = data.target.value;
  }

  onCheckBoxChnage(event: any, element: any) {
    if (event.target.checked) {
      element.editable = true ;
    
      this.selectedRows.push(element);
      this.letElementData = element;
    } else {
      element.editable = false ;
      this.editButtonClick = false;
      const index = this.selectedRows.indexOf(element);
      if (index !== -1) {
        this.selectedRows.splice(index, 1)
      }
      this.editedTakname = ''
    this.editedTakDesc =''
    this.editedPriority = ''
    }

    if (this.selectedRows.length == 1) {
      this.enableEditing = true
    } else {
      this.enableEditing = false
    }

    if (this.selectedRows.length > 0) {
      this.enableDeleting = true
    } else {
      this.enableDeleting = false
    }
  }

  onTaskTabClicked() {
    this.TabName = 'task'
    this.enableEditing = false
    this.enableDeleting = false
  }

  onEditButtonClick(){
    this.letElementData.iseditable2 = true;
    this.editButtonClick = true
    this.editedTakname = this.letElementData.taskname
    this.editedTakDesc = this.letElementData.taskdesc
    this.editedPriority = this.letElementData.priority
  }

  onSaveClick(){
   let Data = {
    _id : this.letElementData._id,
    taskname : this.editedTakname,
    taskdesc : this.editedTakDesc,
    priority : this.editedPriority
   }

   this.http.updateTaskData(Data).subscribe((res)=>{
    this.fetchTaskData()
    this.checkboxRef.nativeElement.checked = false;
    this.letElementData.editable = false;
    this.editButtonClick = false
    this.enableEditing = false
    this.enableDeleting = false
    this.editedTakname = ''
    this.editedTakDesc =''
    this.editedPriority = ''
    this.selectedRows = [];
   })
  
  }

  onCreateClick(){
    this.editedTakname = ''
    this.editedTakDesc =''
    this.editedPriority = ''
    this.showSave = false
    this.dataSource.unshift({
      createdAt: '',
priority: "",
taskdesc: "",
taskid:'',
taskname: "",
iseditable1:true});

setTimeout(()=>{
  this.TabName = 'assigned'
},1)
setTimeout(()=>{
  this.TabName = 'task'
},2)

  this.editButtonClick = true
  }

  onCancelClick(){
    // this.editButtonClick = false
     this.enableEditing = false
     this.enableDeleting = false
    this.selectedRows = []
    this.fetchTaskData();
    
  }

  onDeleteClick(){
    let data = ''
    this.selectedRows.forEach((prop,index)=>{
      data += `${prop.taskid}`
      if(index < this.selectedRows.length - 1){
        data += ','
      }
    })
    let result = confirm('Are you sure you want to delete?')
    if(result){
    this.http.deleteTask(data).subscribe((res) => {
      this.fetchTaskData();
      this.editButtonClick = false
    this.enableEditing = false
    this.enableDeleting = false
    });
  }
  }
}
