import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {login} from '../../login';
import {User} from '../../models/User';
import {ODCList} from 'src/app/models/ODCList';
import {NgxNotificationService} from 'ngx-notification';

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

 // mobilePattern = '^([+]?[9]?[1]?[-]?[0-9]{10})$';              9902200915      +91-9902200915
 mobilePattern='^([6789][0-9]{9})$|([+][9][1][6789][0-9]{9})$'
  

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
  type:string;
  variable=false;

  constructor(private userService: UserService,
              private router: Router,
              private ngxNotificationService: NgxNotificationService,private route:ActivatedRoute) {
  }

  ngOnInit() {
this.type=this.route.snapshot.params.type;
if(this.type==="Admin")
this.variable=true;


this.userService.getAllODC().subscribe((data) => {
      this.odcs = data;
      this.odcs = this.odcs.filter(m => m.odcId !== 1);
    });
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
          this.sendNotification('Register Successfully !!!');
          if(this.type==="None")
          this.router.navigate(['login']);
          else
          this.router.navigate(['home-admin']);
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

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }
}
