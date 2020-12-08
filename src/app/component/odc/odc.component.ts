import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-odc',
  templateUrl: './odc.component.html',
  styleUrls: ['./odc.component.css']
})
export class OdcComponent implements OnInit {

  storedOdcList = ['pune', 'banglore', 'mumbai'];
  odcList = ['pune', 'banglore', 'mumbai'];
  odcName: any;

  constructor() {
  }

  ngOnInit() {
  }

  addOdc() {
    this.odcList.push(this.odcName);
    this.odcName = '';
  }

  deleteOdc(odc: string, deleteFromBackend: boolean): void {
    if (!deleteFromBackend) {
      const index = this.odcList.indexOf(odc);
      if (index !== -1) {
        this.odcList.splice(index, 1);
      }
    }

  }
}
