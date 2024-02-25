import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStorageBinsComponent } from './components/all-storage-bins/all-storage-bins.component';
import { EditStorageBinComponent } from './components/edit-storage-bin/edit-storage-bin.component';

const routes: Routes = [
  { path: '', component: AllStorageBinsComponent },
  { path: 'edit/:id', component: EditStorageBinComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageBinRoutingModule {}
