import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from 'src/shared/shared.module';
import { WeatherForecastComponent } from '../components/weather-forecast/weather-forecast.component';
import { WeatherComponent } from '../components/weather/weather.component';
import { WeatherRoutingModule } from '../routing-module/weather-routing.module';
import { WeatherAPIService } from '../services/weatherAPI.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherComponent, WeatherForecastComponent],
  imports: [
    BrowserModule,
    WeatherRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [WeatherAPIService],
  bootstrap: [],
})
export class WeatherModule {}
