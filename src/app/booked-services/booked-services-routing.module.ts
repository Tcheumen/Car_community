import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBookedServicesComponent } from './all-booked-services.component';

const routes: Routes = [{ path: '', component: AllBookedServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedServicesRoutingModule {}
