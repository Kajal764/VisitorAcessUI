import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/User';
import {ODCList} from '../../models/ODCList';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {

  public data: string;
  public isOdc: boolean;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
