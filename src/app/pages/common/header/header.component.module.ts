import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// import { GroupViewPageRoutingModule } from './group-view-routing.module';

import { HeaderComponent } from './header.component';
import { ShopModalComponent } from 'src/app/components/shop/shop-modal/shop-modal.component';
import { ShopModalComponentModule } from 'src/app/components/shop/shop-modal/shop-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopModalComponentModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  entryComponents: [ShopModalComponent]
})
export class HeaderComponentModule {}
