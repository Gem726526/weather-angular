import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'KToC',
})
export class KelvinToCelsiusPipe implements PipeTransform {
  transform(value: number): string {
    const temprature = (value - 273.15).toFixed(2);
    return temprature;
  }
}
