import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrls: ['./shop-modal.component.scss'],
})
export class ShopModalComponent implements OnInit {
  public shopModalForm: FormGroup;
  @Input() shopName;

  constructor(
    private modalCtrl: ModalController,
    private shopService: ShopService,
    private formBuilder: FormBuilder
  ) { 
    
  }

  ngOnInit() {
    this.shopModalForm = this.formBuilder.group({
      shopName: [
        this.shopName,
        Validators.compose([Validators.required]),
      ],
    });
  }

  submit(shopModalForm:FormGroup){
    this.shopName = shopModalForm.value.shopName;
    this.shopService.setShopName(localStorage.shopId, this.shopName)
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'shopName': this.shopName
    });
  }
}
