import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { WeatherComponent } from '../components/weather/weather.component';
import { WeatherRoutingModule } from '../routing-module/weather-routing.module';
import { WeatherAPIService } from '../services/weatherAPI.service';
import { WeatherForecastComponent } from '../components/weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [WeatherComponent, WeatherForecastComponent],
  imports: [BrowserModule, FormsModule, WeatherRoutingModule],
  providers: [WeatherAPIService],
  bootstrap: [],
})
export class WeatherModule {}
