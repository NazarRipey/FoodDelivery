import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tourl'
})
export class ToUrlPipe implements PipeTransform {

  transform(value: string): string {
    value = value.replace(/[\W_]+/g,"");
    value = value.toLowerCase();

    return value;
  }

}
