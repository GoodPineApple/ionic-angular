import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ItemResultPage } from "./item-result.page";

const routes: Routes = [
  {
    path: "",
    component: ItemResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemResultPageRoutingModule {}
