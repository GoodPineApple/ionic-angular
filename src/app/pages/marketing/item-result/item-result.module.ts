import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ItemResultPageRoutingModule } from "./item-result-routing.module";

import { ItemResultPage } from "./item-result.page";
import { ProductModalComponentModule } from "../../../components/product/product-modal/product-modal.module";
import { ProductModalComponent } from "../../../components/product/product-modal/product-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemResultPageRoutingModule,
    ProductModalComponentModule
  ],
  declarations: [ItemResultPage],
  entryComponents: [ProductModalComponent]
})
export class ItemResultPageModule {}
