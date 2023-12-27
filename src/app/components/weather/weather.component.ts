// weather.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherAPIService } from 'src/app/services/weatherAPI.service';
import { DatePipe } from '@angular/common';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class WeatherComponent implements OnInit {
  weather: any;
  error?: string;
  loactionSearchForm!: FormGroup;
  longitude!: number;
  latitude!: number;
  localTime!: string;
  countryName!: string;
  sunriseTime!: string;
  sunsetTime!: string;
  isLoading = true;
  timeClass!: string;

  constructor(
    private weatherService: WeatherAPIService,
    private formBuilder: FormBuilder
  ) {
    this.loactionSearchForm = this.formBuilder.group({
      city: [''],
    });
  }
  showSunTime(sunrise: number, sunset: number, timeZone: string) {
    this.sunriseTime = new Date(sunrise * 1000).toLocaleString('default', {
      timeZone,
    });
    this.sunsetTime = new Date(sunset * 1000).toLocaleString('default', {
      timeZone,
    });
  }

  getPeriodOfDay(localTime: string, sunrise: string, sunset: string) {
    const sunriseTime = new Date(sunrise);
    const sunsetTime = new Date(sunset);
    const currentTime = new Date(localTime);
    const dawnTime = new Date(sunriseTime.getTime() - 3 * 60 * 60 * 1000);
    const duskTime = new Date(sunsetTime.getTime() + 3 * 60 * 60 * 1000);

    if (currentTime >= dawnTime && currentTime < sunriseTime) {
      return 'dawn';
    } else if (currentTime >= sunriseTime && currentTime < sunsetTime) {
      return 'day';
    } else if (currentTime >= sunsetTime && currentTime < duskTime) {
      return 'dawn';
    } else if (currentTime >= duskTime && currentTime < dawnTime) {
      return 'night';
    } else {
      return 'normal';
    }
  }

  search() {
    this.isLoading = true;
    this.weatherService
      .getWeather(this.loactionSearchForm.value.city)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data: any) => {
          this.weather = data;
          this.longitude = data.coord.lon;
          this.latitude = data.coord.lat;
          this.error = ''; // clear any previous error
          this.weatherService
            .getTimeByCity(this.latitude, this.longitude)
            .subscribe({
              next: (response: any) => {
                this.localTime = response.formatted;
                this.countryName = response.countryName;
              },
              error: (errorResponse) => {
                console.error(errorResponse);
              },
            });
          this.showSunTime(data.sys.sunrise, data.sys.sunset, data.timeZone);
          this.timeClass = this.getPeriodOfDay(
            this.localTime,
            this.sunriseTime,
            this.sunsetTime
          );
        },
        error: (err) => {
          this.weather = '';
          this.error = 'An error occurred while fetching the weather data.';
          console.error(this.error); // log the error to the console
        },
      });
  }

  searchWeatherByLocation() {
    this.isLoading = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Create observables for the two API calls
        const weatherObservable = this.weatherService.getWeatherByCoordinates(
          latitude,
          longitude
        );
        const timeObservable = this.weatherService.getTimeByCity(
          latitude,
          longitude
        );

        // Use forkJoin to wait for both API calls to complete
        forkJoin([weatherObservable, timeObservable]).subscribe({
          next: ([weatherData, timeData]) => {
            this.weather = weatherData;
            this.localTime = timeData.formatted;
            this.countryName = timeData.countryName;
            this.error = ''; // clear any previous error
          },
          error: (err) => {
            this.error = 'An error occurred while fetching the weather data.';
            console.error(err); // log the error to the console
          },
          complete: () => {
            this.isLoading = true;

            console.log('Completed fetching weather data');
          },
        });
      },
      (error) => {
        console.log(
          'Geolocation is not supported by this browser or permission denied.'
        );
        this.loactionSearchForm.value.city = 'Banepa'; // default city
        this.search();
      }
    );
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      this.searchWeatherByLocation();
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.loactionSearchForm.value.city = 'Banepa'; // default city
      this.search();
    }
  }
}
