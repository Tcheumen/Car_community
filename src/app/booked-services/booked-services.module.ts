import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookedServicesRoutingModule } from './booked-services-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AllBookedServicesComponent } from './all-booked-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AllBookedServicesComponent],
  imports: [
    CommonModule, 
    BookedServicesRoutingModule, 
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BookedServicesModule {}
