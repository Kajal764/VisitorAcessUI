import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'time24to12Transform'})
export class Time24to12Format implements PipeTransform {
  transform(time: any): any {

    const time24To12 = function(a) {
      return (new Date('1955-11-05T' + a + 'Z')).toLocaleTimeString('bestfit', {
        timeZone: 'UTC',
        hour12: !0,
        hour: 'numeric',
        minute: 'numeric'
      });
    };
    return time24To12(time);
  }
}
