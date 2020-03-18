import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RecommendProductPageRoutingModule } from "./recommend-product-routing.module";

import { RecommendProductPage } from "./recommend-product.page";

import { ProductCarouselComponentModule } from "../../../components/product/product-carousel/product-carousel.module";
import { ProductCarouselComponent } from "../../../components/product/product-carousel/product-carousel.component";
import { ProductDetailComponentModule } from "src/app/components/product/product-detail/product-detail.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendProductPageRoutingModule,
    ProductCarouselComponentModule,
    ProductDetailComponentModule
  ],
  declarations: [RecommendProductPage],
  entryComponents: [ProductCarouselComponent]
})
export class RecommendProductPageModule {}
