import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCarouselStateComponent } from './product-carousel-state.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    ProductCarouselStateComponent
  ],
  declarations: [
    ProductCarouselStateComponent
  ]
})
export class ProductCarouselStateComponentModule {}
