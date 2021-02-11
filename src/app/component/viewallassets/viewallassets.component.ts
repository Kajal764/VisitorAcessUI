import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AssetData} from 'src/app/models/AssetData';
import {AssetList} from 'src/app/models/AssetList';
import {AssetService} from 'src/app/service/asset.service';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-viewallassets',
  templateUrl: './viewallassets.component.html',
  styleUrls: ['./viewallassets.component.css']
})
export class ViewallassetsComponent implements OnInit {

  assetList: AssetData[];
  isListPresent = false;
  role: string;
  assetTypes = ['All', 'Mouse', 'Keyboard', 'Monitor', 'Laptop', 'Laptop Charger', 'Projector', 'Telephone', 'CPU', 'Cables', 'Tokens', 'Extension Cable', 'Other'];
  selectedText: string = 'All';

  constructor(private assetService: AssetService, private router: Router, private auth: AuthService) {
  }


  ngOnInit() {
    this.assetService.getAssetList(localStorage.getItem('user'))
      .subscribe((data) => {
          this.assetList = data;
          if (this.assetList.length !== 0) {
            this.isListPresent = true;
          }
        },
        (error) => console.log(error));
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }


}
