import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl, PatternValidator} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxNotificationService} from 'ngx-notification';
import {AssetDto} from '../models/AssetDto';
import {ODCList} from '../models/ODCList';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-addasset',
  templateUrl: './addasset.component.html',
  styleUrls: ['./addasset.component.css']
})
export class AddassetComponent implements OnInit {

  asset: AssetDto;
  // assetInfo:AssetInfo;
  dynamicForm: FormGroup;
  submitted = false;
  odcs: ODCList[];
  assetTypes = ['Mouse', 'Keyboard', 'Monitor', 'Laptop', 'Laptop Charger', 'Projector', 'Telephone', 'CPU', 'Cables', 'Tokens','Extension Cable', 'Other'];
  reasons = ['Working', 'Not Working', 'Unused','Unknown'];
  movementSelected: boolean = false;
  movementValue: string;
  numberPattern = "^[0-9]\\d{3}$"

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private route: ActivatedRoute, private ngxNotificationService: NgxNotificationService) {
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      empId: [localStorage.getItem('user'), Validators.required],
      odcName: ['', Validators.required],
      numberOfAssets: ['', [Validators.required,Validators.min(1)]],
      movement: ['', Validators.required],
      // assettype:['',Validators.required],
      // reason:['',Validators.required],
      assetInfos: new FormArray([])
    });
    this.userService.getAllODC().subscribe((data) => this.odcs = data);
  }

  get f() {
    return this.dynamicForm.controls;
  }

  get t() {
    return this.f.assetInfos as FormArray;
  }

  changeMovement(e) {
    console.log(e.target.value);
    this.movementValue = e.target.value;
    if (this.movementValue == 'Outward') {
      this.movementSelected = false;
      this.f.odcName.setValue('Store');
      console.log(this.f.odcName.value);
    } else {
      this.f.odcName.setValue('');
      console.log(this.f.odcName);
      this.movementSelected = true;
    }
  }

  // onChangeAssets(e) {
  //   const numberOfAssets = e.target.value || 0;
  //   if (this.t.length < numberOfAssets) {
  //     for (let i = this.t.length; i < numberOfAssets; i++) {
  //       this.t.push(this.formBuilder.group({
  //         serialNumber: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]*$')]],
  //         description: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z ]*$')]],
  //         type: ['', Validators.required],
  //         status: ['', Validators.required]
  //       }));
  //     }
  //   } else {
  //     for (let i = this.t.length; i >= numberOfAssets; i--) {
  //       this.t.removeAt(i);
  //     }
  //   }
  // }

  onChangeAssets(e) {
    const numberOfAssets = e.target.value || 0;
    if (this.t.length < numberOfAssets) {
      for (let i = this.t.length; i < numberOfAssets; i++) {
        this.t.push(this.formBuilder.group({
          serialNumber: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]*$')]],
          description: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z ]*$')]],
          type: ['', Validators.required],
          status: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfAssets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    // alert('clicked on submit');
    this.submitted = true;

    const data = {
      assetInfos: this.dynamicForm.get('assetInfos').value,
      // type : this.dynamicForm.get('assettype').value,
      empId: this.dynamicForm.get('empId').value,
      odcName: this.dynamicForm.get('odcName').value,
      // reason : this.dynamicForm.get('reason').value
      movement: this.dynamicForm.get('movement').value
    };

    // alert(JSON.stringify(data));
    this.userService.addAsset(data)
      .subscribe((res) => {
          this.asset = res;
          // alert('success');
          
          if(data!=null){
            this.t.clear();
            this.dynamicForm.get('numberOfAssets').setValue(0);
            this.sendNotification('Assets Moved Successfully!!Change number of assets to add more');
          //   setTimeout(() => {
          //     this.router.navigate(['viewAssetList']);
          // }, 5000);
          }

          // this.router.navigate(['viewAssetList'])
          //  this.success = !this.success;
        }, (error) => {
          this.sendNotification(error.error);
          console.log(error.error);
        }
      );

  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }



  removeData(i){
    this.t.removeAt(i);
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }


}
