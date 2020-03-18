import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProductViewPageRoutingModule } from './product-view-routing.module';
import { ProductViewPage } from './product-view.page';
import { HeaderComponentModule } from '../../common/header/header.component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductViewPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [ProductViewPage]
})
export class ProductViewPageModule {}
