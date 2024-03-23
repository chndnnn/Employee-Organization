import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import{HttpServicesService} from './../../services/http-services.service';
import {HttpClientModule} from '@angular/common/http';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphsComponent } from "../graphs/graphs.component";
import { AssignGraphComponent } from "../graphs/assign-graph/assign-graph.component";
import { GeneralServicesService } from '../../services/general-services.service';


@Component({
    selector: 'app-task',
    standalone: true,
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
    providers: [HttpServicesService],
    imports: [MatTableModule, CommonModule, HttpClientModule, FormsModule, GraphsComponent, AssignGraphComponent]
})
export class TaskComponent implements OnInit{

  constructor(private http : HttpServicesService ,private service : GeneralServicesService ){
        this.service.currentMessage.subscribe((message)=>{
          this.sideNavOnOrOff = message
        })
  }

  fetchTaskData(){
    this.http.fetchTaskData().subscribe((res)=>{
      this.data1 = res;
      console.log(this.data1)
      this.dataSource= this.data1.data ;
      this.taskCount = this.dataSource.length
      // console.log(this.taskCount)
     })
  }

  fetchAllAssignedTask(){
    this.http.fetchAllAssignedTAsk().subscribe((res)=>{
      this.allAssignedTask = res;
      this.dataSource1 = this.allAssignedTask.data
      this.assigneTtaskCount = this.dataSource1.length
    })
  }
  ngOnInit(): void {
    this.fetchTaskData();

     this.http.fetchAllEmp().subscribe((res)=>{
         this.data3 = res ;
         this.AllEmpData = this.data3.data;
     })

     this.fetchAllAssignedTask();

     
  }
 
  task:any;
  assignedClick : any = false ;
  data1:any;
  displayedColumns: string[] = ['taskid', 'taskname','taskdesc', 'priority','createdAt','Action'];
  dataSource = [];
  displayedColumns1: string[] = ['taskid', 'taskname','taskdesc', 'priority','createdAt','assignedAt','assignedTo'];
  dataSource1 = [];
  data2:any;
  DistinctEmpDesc:any;
  data3:any;
  allAssignedTask : any ;
  AllEmpData : any ;
  TabName : string = 'task';
  empName : any ;
  sideNavOnOrOff : any ;
  taskCount : number ;
  assigneTtaskCount : number ;
  
  onButtonClick(data:any){
    this.assignedClick = true
    this.task = data
   console.log(this.sideNavOnOrOff)
    this.http.fetchDistinctEmpDesc().subscribe((res)=>{
        this.data2 = res
        this.DistinctEmpDesc = this.data2.data
        console.log(this.DistinctEmpDesc)
    })    
  }

  onselectChange(data:any){
     if(data.target.value != 'select'){
     let data1 = {
      "designation":data.target.value
     }

     this.http.fetchEmpByDesc(data1).subscribe((res)=>{
      this.data3 = res ;
      this.AllEmpData = this.data3.data
      console.log(this.AllEmpData)
     })
    }else{
      this.http.fetchAllEmp().subscribe((res)=>{
        this.data3 = res ;
        this.AllEmpData = this.data3.data;
    })
    }

  }

  onAssignClick(){

    if(this.empName){

    let Data = {
        "assignedTo" : this.empName ,
        "taskid" : this.task.taskid,
        "taskdesc" : this.task.taskdesc,
        "taskname" : this.task.taskname,
        "priority" : this.task.priority,
        "createdAt" : this.task.createdAt
    }
    
    console.log(Data)
    let id1 = this.task.taskid * 1 
    this.http.sendAssignedTask(Data).subscribe((res)=>{
      this.fetchAllAssignedTask();
      alert(`task assigned to ${this.empName}`)
    })

    this.http.deleteTask(id1).subscribe((res)=>{
      this.fetchTaskData();
    });
   
    this.assignedClick = false
  }else{
    alert('Please select assiged name')
  }
  }

  onEmployeeChange(data:any){
     this.empName= data.target.value;
  }

}
