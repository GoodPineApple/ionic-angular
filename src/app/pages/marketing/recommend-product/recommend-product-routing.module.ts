import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendProductPage } from './recommend-product.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendProductPageRoutingModule {}
