import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ProductDetailComponent } from "./product-detail.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [ProductDetailComponent],
  declarations: [ProductDetailComponent]
})
export class ProductDetailComponentModule {}
