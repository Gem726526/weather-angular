import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KelvinToCelsiusPipe } from './pipe/K2Ctemprature.pipe';
import { LoaderCloudComponent } from './loader-cloud/loader-cloud.component';
import { LoaderDayNightComponent } from './loader-day-night/loader-day-night.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: [
    NavBarComponent,
    KelvinToCelsiusPipe,
    LoaderCloudComponent,
    LoaderDayNightComponent,
  ],
  exports: [
    NavBarComponent,
    ReactiveFormsModule,
    FormsModule,
    KelvinToCelsiusPipe,
    LoaderCloudComponent,
    CommonModule,
    LoaderDayNightComponent,
  ],
})
export class SharedModule {}
