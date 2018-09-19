import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolhun'
})
export class BoolHunPipe implements PipeTransform {

  transform(value: boolean, args?: any): string {
    return value ? 'igen' : 'nem';
  }
}
