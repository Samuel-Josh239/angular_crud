import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interface/employee';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://superadmin.homes247.in/crmbackend';

  constructor(private http: HttpClient) { }

  getEmp(): Observable<Employee[]> {
    return this.http.get<{ ExecutiveList: Employee[] }>(`${this.baseUrl}/executives`)
      .pipe(map(response => response.ExecutiveList));
  }
  

  saveUser(employee: Employee): Observable<Employee> {
    const formData = new FormData();
    formData.append("Name", employee.executives_name);
    formData.append("Mobile", employee.executives_number);
    formData.append("dob", employee.executives_dob);
    formData.append("Mail", employee.executives_email);
    formData.append("Designation", employee.exec_desig);
  
    return this.http.post<Employee>(`${this.baseUrl}/addexecutives`, formData);
  }
  


  getEmpById(IDPK: number): Observable<any> {
    return this.http.get<{ ExecutiveList: Employee[] }>(`${this.baseUrl}/execuitiveviewbyid/${IDPK}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const formData = new FormData();
    formData.append("Id", employee.IDPK.toString());
    formData.append("Name", employee.executives_name);
    formData.append("Mobile", employee.executives_number);
    // formData.append("DOB", employee.executives_dob);
    formData.append("Mail", employee.executives_email);
    formData.append("Designation", employee.exec_desig);
  
    return this.http.post<Employee>(`${this.baseUrl}/updateexecutives`, formData);
  }
  





}
