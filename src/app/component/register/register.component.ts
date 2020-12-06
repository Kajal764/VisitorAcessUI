import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  namePattern = '^[A-Za-z]{2,16}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$';
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{8,})$';
  empId = '^[0-9]\\d{6}$';
  mobilePattern = '^[0-9]\\d{9}$';
  public isEmployee = false;

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    empId: new FormControl('', [Validators.required, Validators.pattern(this.empId)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern(this.mobilePattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]),
    role: new FormControl('', Validators.required),
    managerName: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {

  }


  onSubmit() {
    const data = {
      firstName: this.registrationForm.get('firstName').value,
      lastName: this.registrationForm.get('lastName').value,
      email: this.registrationForm.get('email').value,
      password: this.registrationForm.get('password').value,
      empId: this.registrationForm.get('empId').value,
      mobileNo: this.registrationForm.get('mobileNo').value,
      role: this.registrationForm.get('role').value,
      managerName: this.registrationForm.get('managerName').value
    };
    console.log(data);
  }

  check() {
    if (this.registrationForm.get('role').value === 'Employee') {
      this.isEmployee = true;
    }
    if (this.registrationForm.get('role').value === 'Manager') {
      this.isEmployee = false;
    }
  }
}
