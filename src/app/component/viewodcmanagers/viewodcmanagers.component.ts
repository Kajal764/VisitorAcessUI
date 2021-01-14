import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/models/User';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-viewodcmanagers',
  templateUrl: './viewodcmanagers.component.html',
  styleUrls: ['./viewodcmanagers.component.css']
})
export class ViewodcmanagersComponent implements OnInit {

  odcManagers: User[];
  odcName: string;
  odcManagersPresent: boolean;
  public isListPresent = true;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.odcName = this.route.snapshot.params.odcName;
    this.userService.getOdcManagers(this.odcName)
      .subscribe((data) => {
          this.odcManagers = data;
          if (this.odcManagers.length === 0) {
            this.isListPresent = false;
          }
          this.odcManagersPresent = true;
        },
        (error) => console.log(error));
    this.odcManagersPresent = false;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
