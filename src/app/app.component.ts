

import { Component } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Employee } from './interface/employee';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee';
  employee: Employee[] = [];
  selectedEmployee: Employee | null = null;
  searchId!: number;
  employeeForm:FormGroup;
  // atSymbolValidator:'@';

  newEmployee: Employee = {
    IDPK: 0,
    executives_name: '',
    executives_number: '',
    executives_dob: '',
    executives_email: '',
    exec_desig: '',
  };

  constructor(private employeeService: EmployeeService,private formbuilder:FormBuilder) {
    this.employeeForm=formbuilder.group({
      executives_name: ['', [Validators.required, Validators.minLength(3)]],
      executives_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$') ,Validators.maxLength(10)]],
      executives_dob: ['', Validators.required],
      executives_email: ['', [Validators.required, Validators.email]],
      exec_desig: ['', Validators.required]
    })
    // this.employeeForm = this.formbuilder.group({
    //   executives_name: ['', [Validators.required, Validators.minLength(3)]],
    //   executives_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    //   executives_dob: ['', Validators.required],
    //   executives_email: ['', [Validators.required, this.atSymbolValidator]],  // Custom Validator
    //   exec_desig: ['', Validators.required]
    // });
    
  }

  ngOnInit() {
   this.getEmp()
  }

  getEmp(){
    this.employeeService.getEmp().subscribe((data: Employee[]) => {
      console.log(data);
      this.employee = data;
    });
  }
  addEmp() {
    this.employeeService.saveUser(this.newEmployee).subscribe((data: Employee) => {
      console.log(data);
      this.employee.push(data);
      this.newEmployee = {
        IDPK: 0,
        executives_name: '',
        executives_number: '',
        executives_dob: '',
        executives_email: '',
        exec_desig: '',
      };
      if(data){
        this.ngOnInit()
      }
    });
  }


  
  getEmployeeById(IDPK: number) {
    if (!IDPK || IDPK <= 0) {
      alert("Invalid ID. Please enter a valid ID.");
      return;
    }
  
    this.employeeService.getEmpById(IDPK).subscribe(
      (response: any) => {
        console.log("Employee Data:", response);
        if (response.Execuitiveview && response.Execuitiveview.length > 0) {
          this.selectedEmployee = response.Execuitiveview[0];
        } else {
          alert(`No employee found with ID ${IDPK}.`);
          this.selectedEmployee = null;
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
        alert("Error: Failed to fetch employee data.");
      }
    );
  }
  




  editEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee }; // Clone 
  }

  updateEmployee() {
    if (!this.selectedEmployee) return;

    this.employeeService.updateEmployee(this.selectedEmployee).subscribe(
      (updatedData: Employee) => {
        const index = this.employee.findIndex(emp => emp.IDPK === updatedData.IDPK);
        if (index !== -1) {
          this.employee[index] = updatedData;
        }
        this.selectedEmployee = null;
      }
    );
  }
}
