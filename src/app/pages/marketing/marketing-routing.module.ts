import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "start",
    pathMatch: "full"
  },
  {
    path: "item-list",
    redirectTo: "item-list/name/Hello"
  },
  {
    path: "item-list/name/:startName",
    loadChildren: () =>
      import("./item-list/item-list.module").then(
        m => m.ItemListPageModule
      )
  },
  {
    path: "item-list/name/:startName/propose/:proposeMarketingResultId",
    loadChildren: () =>
      import("./item-list/item-list.module").then(
        m => m.ItemListPageModule
      )
  },
  {
    path: "start",
    loadChildren: () =>
      import("./start/start.module").then(
        m => m.StartPageModule
      )
  },
  {
    path: "start/name/:startName/:marketingResultId",
    loadChildren: () =>
      import("./start/start.module").then(
        m => m.StartPageModule
      )
  },
  {
    path: "item-result/name/:startName/:marketingResultId",
    loadChildren: () =>
      import("./item-result/item-result.module").then(
        m => m.ItemResultPageModule
      )
  },
  {
    path: "recommend-product/name/:startName/:marketingResultId",
    loadChildren: () =>
      import(
        "./recommend-product/recommend-product.module"
      ).then(m => m.RecommendProductPageModule)
  },
  {
    path: "pre-reservation/name/:startName/:marketingResultId",
    loadChildren: () =>
      import("./pre-reservation/pre-reservation.module").then(
        m => m.PreReservationPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule {}
