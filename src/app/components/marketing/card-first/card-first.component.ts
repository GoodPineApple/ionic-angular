import { Component, OnInit, Input } from "@angular/core";
import { trigger, transition, animate, style } from "@angular/animations";
import { AlertController, ModalController } from "@ionic/angular";
import { ProductModalComponent } from "../../product/product-modal/product-modal.component";

@Component({
  selector: "app-card-first",
  templateUrl: "./card-first.component.html",
  styleUrls: ["./card-first.component.scss"],
  animations: [
    trigger("items", [
      transition(":enter", [
        style({ transform: "scale(0.5)", opacity: 0 }), // initial
        animate(
          "1s cubic-bezier(.8, -0.6, 0.2, 1.5)",
          style({ transform: "scale(1)", opacity: 1 })
        ) // final
      ])
    ])
  ]
})
export class CardFirstComponent implements OnInit {
  @Input() product;

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  ngOnDestroy() {
    console.log("card-first destroyed");
  }

  async clickDetail(product) {
    const modal = await this.modalController.create({
      component: ProductModalComponent,
      componentProps: {
        productName: product.productName,
        productImgUrl: product.productImgUrl,
        productPrice: product.productPrice,
        productCurrency: product.productCurrency,
        productOption: product.productOption,
        productDetail: product.productDetail,
        shopSiteName: product.shopSiteName,
        votedNum: product.votedNum
      },
      cssClass: "product-modal"
    });
    await modal.present();
  }
}
