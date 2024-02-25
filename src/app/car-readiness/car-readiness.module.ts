import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarReadinessRoutingModule } from './car-readiness-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AllCarsComponent } from './all-cars.component';

@NgModule({
  declarations: [AllCarsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CarReadinessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CarReadinessModule {}
