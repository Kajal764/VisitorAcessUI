import {Pipe, PipeTransform} from '@angular/core';
import {AssetList} from '../../models/AssetList';

@Pipe({name: 'appFilter'})
export class FilterPipe implements PipeTransform {
  transform(items: AssetList[], searchText: string): any[] {
    console.log(searchText);
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    const assetLists = items.filter(it => {
        return it.serialNumber.toLocaleLowerCase().includes(searchText) || it.description.toLocaleLowerCase().includes(searchText);
      }
    );
    return assetLists;
  }
}

