import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../models/User';

@Pipe({name: 'userFilter'})
export class FilterUser implements PipeTransform {
  transform(items: User[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    const users = items.filter(it => {
        return it.empId.includes(searchText) || it.firstName.toLocaleLowerCase().includes(searchText) || it.lastName.toLocaleLowerCase().includes(searchText);
      }
    );
    console.log(users, 'users ');
    return users;
  }
}

