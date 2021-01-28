import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InteractionService} from '../service/interaction.service';

@Component({
    selector: 'app-assetmanagementnav',
    templateUrl: './assetmanagementnav.component.html',
    styleUrls: ['./assetmanagementnav.component.css']
})
export class AssetmanagementnavComponent implements OnInit {


    constructor(private router: Router,
                private interactionService: InteractionService) {
    }

    search: string;
    role: string;
    searchText: any;

    ngOnInit() {
        this.role = localStorage.getItem('role');
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
    }

    searchData(event: any) {
        this.interactionService.sendData(event);
    }
}
