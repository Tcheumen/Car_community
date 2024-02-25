import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingSpaceRoutingModule } from './parking-space-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AllParkingSpaceComponent } from './all-parking-space.component';

@NgModule({
  declarations: [AllParkingSpaceComponent],
  imports: [CommonModule, ParkingSpaceRoutingModule, SharedModule],
})
export class ParkingSpaceModule {}
