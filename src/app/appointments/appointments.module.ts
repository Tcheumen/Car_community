import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { SharedModule } from '../shared/shared.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, AppointmentsRoutingModule],
  declarations: [AppointmentsComponent],
})
export class AppointmentsModule {}
