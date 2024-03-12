import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import{HttpServicesService} from './../../services/http-services.service';
import {HttpClientModule} from '@angular/common/http';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatTableModule,CommonModule,HttpClientModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers:[HttpServicesService]
})
export class TaskComponent implements OnInit  {

  constructor(private http : HttpServicesService ){}
  ngOnInit(): void {
    this.http.fetchTaskData().subscribe((res)=>{
      this.data1 = res;
      this.dataSource= this.data1.data ;
     })

     this.http.fetchAllEmp().subscribe((res)=>{
         this.data3 = res ;
         this.AllEmpData = this.data3.data;
     })

     this.http.fetchAllAssignedTAsk().subscribe((res)=>{
       this.allAssignedTask = res;
       this.dataSource1 = this.allAssignedTask.data
     })
  }
 
  taskname:any;
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

  onButtonClick(data:any){
    this.assignedClick = true
    this.taskname = data.taskname

    this.http.fetchDistinctEmpDesc().subscribe((res)=>{
        this.data2 = res
        this.DistinctEmpDesc = this.data2.data
        console.log(this.DistinctEmpDesc)
    })
      
  }

  onselectChange(data:any){
     console.log(data.target.value)
     if(data.target.value != 'select'){
     let data1 = {
      "empdesc":data.target.value
     }

     this.http.fetchEmpByDesc(data1).subscribe((res)=>{
      this.data3 = res ;
      this.AllEmpData = this.data3.data
     })
    }else{
      this.http.fetchAllEmp().subscribe((res)=>{
        this.data3 = res ;
        this.AllEmpData = this.data3.data;
    })
    }

  }

  onAssignClick(){
    
  }

}
