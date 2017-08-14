import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formsSearch',
  pure: false
})
export class FormsSearch implements PipeTransform {
  transform(items: any[], filter) {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => {
      return item.title && item.title.toLowerCase().indexOf(filter) >= 0
    });
  }
}