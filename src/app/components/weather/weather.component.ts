// weather.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { WeatherAPIService } from 'src/app/services/weatherAPI.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent {
  city = 'Banepa';
  weather: any;
  error?: string;

  constructor(private weatherService: WeatherAPIService) {}

  search() {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weather = data;
        this.error = ''; // clear any previous error
      },
      (error) => {
        this.error = 'An error occurred while fetching the weather data.';
        console.error(error); // log the error to the console
      }
    );
  }
}
