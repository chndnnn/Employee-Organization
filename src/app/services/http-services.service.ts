import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http:HttpClient) { }

fetchTaskData(){
    return this.http.get('http://127.0.0.1:3000/employee/backend/getData')
}
fetchDistinctEmpDesc(){
  return this.http.get('http://127.0.0.1:3000/employee/backend/distinctDesignation')
}

fetchAllEmp(){
  return this.http.get('http://127.0.0.1:3000/employee/backend/allEmp')
}

addEmployee(employeeData: any): Observable<any>{
  return this.http.post('http://127.0.0.1:3000/employee/backend/addEmp',employeeData)
}
deleteEmployee(emp_id: any): Observable<any>{
  return this.http.post('http://127.0.0.1:3000/employee/backend/deleteEmp',{ emp_id })
}

fetchEmpByDesc(data:any){
  return this.http.post('http://127.0.0.1:3000/employee/backend/allEmpDesc',data)
}

fetchAllAssignedTAsk(){
  return this.http.get('http://127.0.0.1:3000/employee/backend/getAllAssignData')
}

sendAssignedTask(data:any){
  return this.http.post('http://127.0.0.1:3000/employee/backend/createAssignData',data)
}

deleteTask(data:any){
  return this.http.delete(`http://127.0.0.1:3000/employee/backend/deleteData/${data}`)
}

}


