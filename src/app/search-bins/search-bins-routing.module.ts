import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBinsComponent } from './components/search-bins/search-bins.component';

const routes: Routes = [{ path: '', component: SearchBinsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBinsRoutingModule {}
