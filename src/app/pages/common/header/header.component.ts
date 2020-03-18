import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShopModalComponent } from 'src/app/components/shop/shop-modal/shop-modal.component';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() isRootPage : boolean;
  @Input() shopName : string;
  @Input() backRedirectUrl : string;

  constructor(
    private router : Router,
    private shopService: ShopService,
    public modalController: ModalController
  ) { }
  
  async ngOnInit() {
    let shop = await this.shopService.getShopByProfileId(localStorage.profileId)
    this.shopName = shop.name;
    if(shop.name == "" || shop.name == null){
      this.showEditShopModal();
    }
  }

  backClicked() {
    if(this.backRedirectUrl != undefined){
      this.router.navigateByUrl(this.backRedirectUrl)
    }else{
      window.history.back();
    }
  }

  async showEditShopModal(){
    const modal = await this.modalController.create({
      component: ShopModalComponent,
      componentProps: {
        shopName: this.shopName
      },
      cssClass: "product-modal",
      backdropDismiss: false
    });
    await modal.present();
    
    let modalResult = await modal.onWillDismiss();
    this.shopName =  modalResult.data.shopName;
  }

}
