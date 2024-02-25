import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakeAppointmentComponent } from './make-appointment.component';

const routes: Routes = [{ path: '', component: MakeAppointmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeAppointmentRoutingModule {}
