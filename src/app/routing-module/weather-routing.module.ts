// weather-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from '../components/weather/weather.component';
import { WeatherForecastComponent } from '../components/weather-forecast/weather-forecast.component';

const routes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: 'weather-forecast', component: WeatherForecastComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
