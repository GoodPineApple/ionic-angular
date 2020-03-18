import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupListComponent } from './group-list.component';
import { ProductCarouselStateComponentModule } from '../../product/product-carousel-state/product-carousel-state.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCarouselStateComponentModule
  ],
  exports: [
    GroupListComponent
  ],
  declarations: [
    GroupListComponent
  ]
})
export class GroupListComponentModule {}
