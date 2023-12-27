import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KelvinToCelsiusPipe } from './pipe/K2Ctemprature.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: [NavBarComponent, KelvinToCelsiusPipe],
  exports: [
    NavBarComponent,
    ReactiveFormsModule,
    FormsModule,
    KelvinToCelsiusPipe,
  ],
})
export class SharedModule {}
