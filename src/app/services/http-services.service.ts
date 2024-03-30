import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

updateTaskData(data:any){
  return this.http.patch("http://127.0.0.1:3000/employee/backend/updateTaskData",data)
}

createTaskData(Data:any){
  return this.http.post('http://127.0.0.1:3000/employee/backend/createTaskData',Data)
}

updateSerialNumber(data:any){
  return this.http.patch('http://127.0.0.1:3000/employee/backend/updateSerialNumber',data)

}

}
