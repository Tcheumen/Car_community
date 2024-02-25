import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableCarsComponent } from './components/available-cars/available-cars.component';

const routes: Routes = [
  { path: '', component: AvailableCarsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsManagementRoutingModule {}
