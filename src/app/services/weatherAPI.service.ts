// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  private API_KEY = '3739ababa9bd7fc70e9e6563495d1812';
  private API_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}`;

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(`${this.API_URL}&q=${city}`);
  }

  getWeatherByCoordinates(lat: number, lon: number) {
    return this.http.get(`${this.API_URL}&lat=${lat}&lon=${lon}`);
  }
}
