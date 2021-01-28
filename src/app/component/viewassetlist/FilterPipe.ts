import {Pipe, PipeTransform} from '@angular/core';
import {AssetList} from '../../models/AssetList';

@Pipe({name: 'appFilter'})
export class FilterPipe implements PipeTransform {
  transform(items: AssetList[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    const assetLists = items.filter(it => {
        return it.serialNumber.toLocaleLowerCase().includes(searchText) || it.name.toLocaleLowerCase().includes(searchText);
      }
    );
    return assetLists;
  }
}

