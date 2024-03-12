import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http:HttpClient) { }

fetchTaskData(){
    return this.http.get('http://127.0.0.1:3001/taskList/task')
}
fetchDistinctEmpDesc(){
  return this.http.get('http://127.0.0.1:3001/employee/EmpDesc')
}

fetchAllEmp(){
  return this.http.get('http://127.0.0.1:3001/employee/allEmp')
}

fetchEmpByDesc(data:any){
  return this.http.post('http://127.0.0.1:3001/employee/getEmpByDesc',data)
}

fetchAllAssignedTAsk(){
  return this.http.get('http://127.0.0.1:3001/assignedTask/alltasks')
}

}


