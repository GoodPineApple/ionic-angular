import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-product-modal",
  templateUrl: "./product-modal.component.html",
  styleUrls: ["./product-modal.component.scss"]
})
export class ProductModalComponent implements OnInit {
  @Input() productName;
  @Input() productImgUrl;
  @Input() productPrice;
  @Input() productCurrency;
  @Input() productOption;
  @Input() productDetail;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
