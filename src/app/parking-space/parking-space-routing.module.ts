import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllParkingSpaceComponent } from './all-parking-space.component';

const routes: Routes = [{ path: '', component: AllParkingSpaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingSpaceRoutingModule {}
