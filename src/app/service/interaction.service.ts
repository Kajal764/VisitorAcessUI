import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor() {
  }

  private searchDataSource = new Subject<string>();
  searchData$ = this.searchDataSource.asObservable();

  sendData(value: string): void {
    this.searchDataSource.next(value);
  }
}
