import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageBinComponent } from './storage-bin.component';
import { StorageBinRoutingModule } from './storage-bin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AllStorageBinsComponent } from './components/all-storage-bins/all-storage-bins.component';
import { EditStorageBinComponent } from './components/edit-storage-bin/edit-storage-bin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StorageBinRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  declarations: [
    StorageBinComponent,
    AllStorageBinsComponent,
    EditStorageBinComponent,
  ],
})
export class StorageBinModule {}
