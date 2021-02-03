import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';
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

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,private auth:AuthService) {
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
    if(confirm('Are you sure you want to logout?')){
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    this.auth.logout();
    }
  }

}
