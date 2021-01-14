import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {login} from '../../login';
import {User} from '../../models/User';
import {ODCList} from 'src/app/models/ODCList';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  odcs: ODCList[];

  namePattern = '^[A-Za-z- ]{1,16}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$';
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{8,})$';
  empId = '^[0-9]\\d{6}$';
  mobilePattern = '^[0-9]\\d{9}$';
  public isEmployee = false;
  isOdcManager = false;

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    empId: new FormControl('', [Validators.required, Validators.pattern(this.empId)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern(this.mobilePattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]),
    role: new FormControl('', Validators.required),
    managerName: new FormControl(''),
    odc: new FormControl('')
  });
  private responseData: any;
  private flag = false;
  public managers: User[];
  private message: any;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) => this.odcs = data);
    this.userService.managers()
      .subscribe(data => {
          this.managers = data;
        },
        error => {
          this.message = error.error.message;
        });
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
      managerName: this.registrationForm.get('managerName').value,
      odc: this.registrationForm.get('odc').value
    };
    if (this.registrationForm.invalid === false) {
      this.userService.register(data)
        .subscribe(response => {
          this.responseData = response.body;
          this.message = response.body.message;
          this.flag = true;
          this.router.navigate(['login']);
        }, (error) => {
          this.flag = true;
          this.message = error.error.message;
        });
    }
  }

  check() {
    if (this.registrationForm.get('role').value === 'Employee') {
      this.isEmployee = true;
      this.isOdcManager = false;
    }
    if (this.registrationForm.get('role').value === 'Manager') {
      this.isEmployee = true;
      this.isOdcManager = false;
    }
    if (this.registrationForm.get('role').value === 'odcManager') {
      this.isEmployee = false;
      this.isOdcManager = true;
    }
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
