import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeAppointmentComponent } from './make-appointment.component';
import { SharedModule } from '../shared/shared.module';
import { MakeAppointmentRoutingModule } from './make-appointment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MakeAppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MakeAppointmentComponent],
})
export class MakeAppointmentModule {}
