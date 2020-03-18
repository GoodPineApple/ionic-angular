import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductModalComponent } from './product-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    ProductModalComponent
  ],
  declarations: [
    ProductModalComponent
  ]
})
export class ProductModalComponentModule {}
