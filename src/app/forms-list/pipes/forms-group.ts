import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formsGroup',
  pure: false
})
export class FormsGroup implements PipeTransform {
  transform(items: any[], filter) {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
      return item.group === filter
    });
  }
}