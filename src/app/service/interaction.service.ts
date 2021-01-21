import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private router: Router) {
  }

  private searchDataSource = new Subject<string>();
  searchData$ = this.searchDataSource.asObservable();

  sendData(value: string): void {
    this.searchDataSource.next(value);

  }
}
