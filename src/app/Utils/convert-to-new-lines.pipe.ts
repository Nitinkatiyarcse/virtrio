import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToNewLines'
})
export class ConvertToNewLinesPipe implements PipeTransform {

  transform(value: any): any {
    return value;
  }

}
