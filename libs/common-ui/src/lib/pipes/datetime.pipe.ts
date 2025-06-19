import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
})
export class DatetimePipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null;

    const past = new Date(value).getTime();
    let diff = Date.now() - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (seconds < 60) return 'меньше минуты назад';

    if (minutes === 1) return '1 минуту назад';
    if (minutes > 1 && minutes < 5) return `${minutes} минуты назад`;
    if (minutes < 60) return `${minutes} минут назад`;

    if (hours === 1) return '1 час назад';
    if (hours > 1 && hours < 5) return `${hours} часа назад`;
    if (hours < 24) return `${hours} часов назад`;

    if (days === 1) return '1 день назад';
    if (days > 1 && days < 5) return `${days} дня назад`;
    return `${days} дней назад`;
  }
}
