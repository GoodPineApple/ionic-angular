import { Component, OnInit, Input } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { trigger, transition, animate, style } from "@angular/animations";
import { map } from "rxjs/operators";

import { ProductState } from "../../../states/product/product.state";
import { Select, Store } from "@ngxs/store";
import { Product } from "../../../models/Product";
import { Observable } from "rxjs";
import {
  AddProduct,
  GetProductArr,
  SetSelectedProduct
} from "../../../actions/product/product.action";

@Component({
  selector: "app-product-carousel-state",
  templateUrl: "./product-carousel-state.component.html",
  styleUrls: ["./product-carousel-state.component.scss"],
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
export class ProductCarouselStateComponent implements OnInit {
  // @Select(ProductState.selectProductArr) productArr$: Observable<Product[]>;
  productArr$: Observable<Object>;
  @Input() groupId;
  @Input() GroupSlideOpts;

  constructor(
    private router: Router,
    private store: Store,
    private alertCtrl: AlertController
  ) {
    console.log("[product-carousel-state constructor]");
  }

  ngOnInit() {
    console.log("[product-carousel-state ngOnInit]");
    this.store.dispatch(new GetProductArr(this.groupId));
    this.productArr$ = this.store
      .select(ProductState.selectProductArr)
      .pipe(map(filterFn => filterFn(this.groupId)));
  }

  async addProduct() {
    const alert = await this.alertCtrl.create({
      subHeader: "새 상품 만들기",
      inputs: [
        {
          type: "text",
          name: "productName",
          placeholder: "상품이름",
          value: ""
        },
        {
          type: "text",
          name: "productImgUrl",
          placeholder: "상품URL",
          value: ""
        },
        {
          type: "number",
          name: "productPrice",
          placeholder: "상품가격",
          value: ""
        },
        {
          type: "text",
          name: "productCurrency",
          placeholder: "단위",
          value: ""
        },
        {
          type: "text",
          name: "productOption",
          placeholder: "상품옵션",
          value: ""
        },
        {
          type: "text",
          name: "productDetail",
          placeholder: "상세정보",
          value: ""
        },
        {
          type: "text",
          name: "shopSiteName",
          placeholder: "쇼핑몰명",
          value: ""
        },
        {
          type: "text",
          name: "shopSiteUrl",
          placeholder: "쇼핑몰URL",
          value: ""
        }
      ],
      buttons: [
        { text: "취소" },
        {
          text: "저장",
          handler: async data => {
            let payload: any = {
              productName: data.productName,
              productImgUrl: data.productImgUrl,
              productPrice: data.productPrice,
              productCurrency: data.productCurrency,
              productOption: data.productOption,
              productDetail: data.productDetail,
              shopSiteName: data.shopSiteName,
              shopSiteUrl: data.shopSiteUrl,
              profileId: localStorage.profileId,
              shopId: localStorage.shopId,
              groupId: this.groupId
            };
            this.store.dispatch(new AddProduct(payload));
          }
        }
      ]
    });
    await alert.present();
  }

  goProductDtl(groupId, productId) {
    this.router.navigateByUrl(
      `product/view/grp-id/${groupId}/pdct-id/${productId}`
    );
  }
}
