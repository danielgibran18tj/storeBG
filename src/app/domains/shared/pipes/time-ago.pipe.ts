import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  // ng g p domains/shared/pipes/time-ago

  transform(value: string): string {
    const date = new Date(value)
    const today = new Date()

    return formatDistance(today, date)
  }

}
