import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {
  product;
  groupId;
  productId;
  backRedirectUrl = "/main";
  slideOptions;
  numbers;

  constructor(
    private actRoute: ActivatedRoute,
    private commonService : CommonService,
    private productService : ProductService
  ) { 
    console.log("[product-view.page constructor]");
    this.numbers = Array(5);
  }

  async ngOnInit() {
    this.slideOptions = this.commonService.getSlideOptionProduct();
    this.actRoute.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.productId = params['productId'];
    });
    this.product = await this.productService.getProductByProductId(this.productId);
  }

  shareProduct(){
    alert("사달라고 조르기")
  }
  
  getMoreProduct(){
    alert("해외상품 더보기")
  }
}
