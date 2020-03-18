import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreReservationPage } from './pre-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: PreReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreReservationPageRoutingModule {}
