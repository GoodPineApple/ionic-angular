import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ItemListPageRoutingModule } from "./item-list-routing.module";

import { ItemListPage } from "./item-list.page";

import { CardFirstComponentModule } from "../../../components/marketing/card-first/card-first.module";
import { ProductDetailComponentModule } from "../../../components/product/product-detail/product-detail.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemListPageRoutingModule,
    CardFirstComponentModule,
    ProductDetailComponentModule
  ],
  declarations: [ItemListPage]
  // entryComponents: [CardFirstComponentModule,CardSecondComponentModule],
})
export class ItemListPageModule {}
