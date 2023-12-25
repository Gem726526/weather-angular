// weather.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherAPIService } from 'src/app/services/weatherAPI.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent implements OnInit {
  weather: any;
  error?: string;
  loactionSearchForm!: FormGroup;

  constructor(
    private weatherService: WeatherAPIService,
    private formBuilder: FormBuilder
  ) {
    this.loactionSearchForm = this.formBuilder.group({
      city: [''],
    });
  }

  search() {
    this.weatherService
      .getWeather(this.loactionSearchForm.value.city)
      .subscribe({
        next: (data) => {
          this.weather = data;
          this.error = ''; // clear any previous error
        },
        error: (err) => {
          this.weather = '';
          this.error = 'An error occurred while fetching the weather data.';
          console.error(this.error); // log the error to the console
        },
      });
  }

  searchWeatherByLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.weatherService
          .getWeatherByCoordinates(latitude, longitude)
          .subscribe({
            next: (data) => {
              this.weather = data;
              this.error = ''; // clear any previous error
            },
            error: (err) => {
              this.error = 'An error occurred while fetching the weather data.';
              console.error(err); // log the error to the console
            },
            complete: () => {
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
