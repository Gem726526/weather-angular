// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  private API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${environment.WEATHER_API_KEY}`;
  private TIME_URL = `https://api.timezonedb.com/v2.1/get-time-zone?key=${environment.TIME_API_KEY}&format=json&by=position`;

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    return this.http.get(`${this.API_URL}&q=${city}`);
  }

  getWeatherByCoordinates(lat: number, lon: number) {
    return this.http.get(`${this.API_URL}&lat=${lat}&lon=${lon}`);
  }

  getTimeByCity(lat: number, long: number): Observable<any> {
    return this.http.get(`${this.TIME_URL}&lat=${lat}&lng=${long}`);
  }
}

// ttp://api.timezonedb.com/v2.1/get-time-zone?key=F6YP8FR2EZ0Y&format=xml&by=position&lat=40.689247&lng=-74.044502
