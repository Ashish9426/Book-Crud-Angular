import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBook'
})
export class FilterBookPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
