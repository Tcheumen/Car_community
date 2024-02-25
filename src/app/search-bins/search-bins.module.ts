import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBinsRoutingModule } from './search-bins-routing.module';
import { SearchBinsComponent } from './components/search-bins/search-bins.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchBinsComponent],
  imports: [
    CommonModule,
    SearchBinsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class SearchBinsModule {}
