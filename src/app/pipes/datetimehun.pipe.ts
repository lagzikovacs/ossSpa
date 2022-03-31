// https://stackoverflow.com/questions/39728481/angular2-date-pipe-does-not-work-in-ie-11-and-edge-13-14
// http://momentjs.com/docs/#/parsing/string/

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'datetimehun'})
export class DatetimeHunPipe implements PipeTransform {
    transform(value: any, format: string = 'YYYY.MM.DD HH:mm:ss'): string {
        // Try and parse the passed value.
        const momentDate = moment(value);

        // If moment didn't understand the value, return it unformatted.
        if (!momentDate.isValid()) {
          return value;
        }

        // Otherwise, return the date formatted as requested.
        return momentDate.format(format);
    }
}

