import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsManagementRoutingModule } from './cars-management-routing.module';
import { AvailableCarsComponent } from './components/available-cars/available-cars.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AvailableCarsComponent],
  imports: [
    CommonModule,
    CarsManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CarsManagementModule {}
