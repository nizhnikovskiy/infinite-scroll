import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablePageComponent } from "./components/table-page/table-page.component";
import { TripInfoPageComponent } from "./components/trip-info-page/trip-info-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'trips', component: TablePageComponent },
  { path: 'trip/:id', component: TripInfoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
