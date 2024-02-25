import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'booked-services',
        loadChildren: () =>
          import('./booked-services/booked-services.module').then(
            (m) => m.BookedServicesModule
          ),
      },
      {
        path: 'search-bins',
        loadChildren: () =>
          import('./search-bins/search-bins.module').then(
            (m) => m.SearchBinsModule
          ),
      },
      {
        path: 'car-readiness',
        loadChildren: () =>
          import('./car-readiness/car-readiness.module').then(
            (m) => m.CarReadinessModule
          ),
      },
      {
        path: 'cars-management',
        loadChildren: () =>
          import('./cars-management/cars-management.module').then(
            (m) => m.CarsManagementModule
          ),
      },
      {
        path: 'storage-bin',
        loadChildren: () =>
          import('./storage-bin/storage-bin.module').then(
            (m) => m.StorageBinModule
          ),
      },
      {
        path: 'parking-space',
        loadChildren: () =>
          import('./parking-space/parking-space.module').then(
            (m) => m.ParkingSpaceModule
          ),
      },
      {
        path: 'make-appointment',
        loadChildren: () =>
          import('./make-appointment/make-appointment.module').then(
            (m) => m.MakeAppointmentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
