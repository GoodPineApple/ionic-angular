import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardFirstComponent } from './card-first.component';
import { ProductModalComponentModule } from '../../product/product-modal/product-modal.module'
import { ProductModalComponent } from '../../product/product-modal/product-modal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductModalComponentModule
  ],
  exports: [
    CardFirstComponent,
  ],
  declarations: [
    CardFirstComponent
  ],
  entryComponents: [
    ProductModalComponent
  ]
})
export class CardFirstComponentModule {}
