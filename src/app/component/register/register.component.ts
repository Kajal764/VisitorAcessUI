import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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
  public odcs: ODCList[];

  namePattern = '^[A-Za-z- ]{1,16}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$';
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{8,})$';
  empId = '^[0-9]\\d{6}$';
  //mobilePattern = '([+][1-9]{2}[-])([0-9]\\d{9})$';

   mobilePattern = '^([+]?[9]?[1]?[-]?[0-9]{10})$';
   //mobilePattern ='^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$';
   //mobilePattern = '^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$';

  //mobilePattern = '^([+][0-9]{12})|([0-9]{10})$'
  
  public isEmployee = true;
  isOdcManager = false;
  public roles = ['Employee'];
  public selectOdc = [];

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    empId: new FormControl('', [Validators.required, Validators.pattern(this.empId)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern(this.mobilePattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]),
    role: new FormControl(''),
    managerName: new FormControl(''),
    odc: new FormControl(''),
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
      role: this.roles,
      managerName: this.registrationForm.get('managerName').value,
      odc: this.selectOdc
    };
    if (this.registrationForm.invalid === false) {
      this.userService.register(data)
        .subscribe(response => {
          this.responseData = response.body;
          this.message = response.body.message;
          this.flag = true;
          this.router.navigate(['login']);
          this.selectOdc = [];
          this.roles = [];
        }, (error) => {
          this.flag = true;
          this.message = error.error.message;
        });

    }
  }


  redirectToLogin() {
    this.router.navigate(['login']);
  }


  viewPassword() {
    const pass = document.getElementById('password-field');
    const icon = document.getElementById('pass-status');
    if (pass.getAttribute('type') === 'password') {
      pass.setAttribute('type', 'text');
      icon.setAttribute('class', 'fa fa-eye icon');
    } else {
      pass.setAttribute('type', 'password');
      icon.setAttribute('class', 'fa fa-eye-slash icon');
    }
  }

  getSelectedRole($event) {
    if ($event.target.checked) {
      this.roles.push($event.target.value);
      if ($event.target.value === 'Odc-Manager') {
        this.isOdcManager = true;
        this.isEmployee = false;
      }
    } else {
      this.roles = this.roles.filter(m => m !== $event.target.value);
      if ($event.target.value === 'Odc-Manager') {
        this.isOdcManager = false;
        this.isEmployee = true;
      }
    }
  }

  getSelectedOdc($event, odcName: string) {
    if ($event.target.checked) {
      this.selectOdc.push(odcName);
    } else {
      this.selectOdc = this.roles.filter(m => m !== odcName);
    }
  }
}
