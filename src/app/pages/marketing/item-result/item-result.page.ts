import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MarketingService } from "src/app/services/marketing/marketing.service";
import { ModalController } from "@ionic/angular";

import { Store } from "@ngxs/store";

import {
  GetRecommendProduct,
  ClearRecommendProduct
} from "../../../actions/marketing/recommend-product.action";

import { UserDataForMarketing } from "../../../models/User";

import { AddUpdatedRecommendProduct } from "../../../actions/marketing/recommend-product.action";

import { GoogleAnalyticsService } from "../../../services/google-analytics/google-analytics.service";
import { FacebookPixelService } from "../../../services/facebook-pixel/facebook-pixel.service";

@Component({
  selector: "app-item-result",
  templateUrl: "./item-result.page.html",
  styleUrls: ["./item-result.page.scss"]
})
export class ItemResultPage implements OnInit {
  startName: string;
  marketingResult;
  marketingResultProduct;
  recommendProductArr;
  updatedRecommendProduct;
  marketingResultId: string;
  recommendPoint: number;
  userDataForMarketing: UserDataForMarketing = new UserDataForMarketing();

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private marketingService: MarketingService,
    public modalController: ModalController,
    private store: Store,
    private googleAnalyticsService: GoogleAnalyticsService,
    private facebookPixelService: FacebookPixelService
  ) {
    this.actRoute.params.subscribe(params => {
      this.userDataForMarketing.name = params["startName"];
      this.userDataForMarketing.marketingResultId = params["marketingResultId"];
      // this.userDataForMarketing.linkName = window.location.href;

      this.startName = params["startName"];
      this.marketingResultId = params["marketingResultId"];
    });
  }

  async ngOnInit() {
    this.store.dispatch(new GetRecommendProduct()).subscribe(data => {
      this.updatedRecommendProduct = data.recommend_product.recommendProductArr;
      if(this.updatedRecommendProduct.length == 0){
        location.href="/";
      }
    });

    const splitedPath = window.location.pathname.split("/");

    this.marketingResultId = splitedPath[splitedPath.length - 1];

    const fetchData = await this.marketingService.getRecommendProductResult(
      this.updatedRecommendProduct,
      this.marketingResultId
    );

    this.recommendProductArr = fetchData["param"];
    this.recommendPoint = parseInt(fetchData["recommendPoint"]);

    this.store.dispatch(new ClearRecommendProduct());

    this.recommendProductArr.forEach(data => {
      this.store.dispatch(new AddUpdatedRecommendProduct(data));
    });

    this.googleAnalyticsService.trackUserTiming("load_item_result_page");
    this.googleAnalyticsService.trackScreenView("item_result_page");
  }

  shareItemResult() {
    // TODO Mobile 환경에서 공유하기 기능 호출 가능한지 확인하여 분기
    this.copyUrlToClipboard();
  }

  async copyUrlToClipboard() {
    var tempElem = document.createElement("textarea");
    tempElem.value = window.location.href.replace("/item-result", "/start");
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);

    this.userDataForMarketing.linkName = tempElem.value;

    await this.marketingService.postUserDataForMarketing(
      this.userDataForMarketing
    );

    this.googleAnalyticsService.eventEmitter(
      "share_pick_result",
      "engagement",
      "share",
      "click",
      1
    );

    this.facebookPixelService.eventEmitter(
      "share_pick_result",
      "engagement",
      "share",
      "click",
      1
    );

    alert("결과 URL이 복사되었습니다.");
  }

  goRecommendProductsDetail() {
    this.router.navigateByUrl(
      `recommend-product/name/${this.startName}/${this.marketingResultId}`
    );

    this.googleAnalyticsService.eventEmitter(
      "check_product_detail",
      "engagement",
      "product_check",
      "click",
      1
    );
  }

  retryCardPick() {
    this.store.dispatch(new ClearRecommendProduct());
    this.router.navigateByUrl(`item-list/name/${this.startName}`);

    this.googleAnalyticsService.eventEmitter(
      "retry_pick_game",
      "engagement",
      "game_retry",
      "click",
      1
    );

    this.facebookPixelService.eventEmitter(
      "retry_pick_game",
      "engagement",
      "game_retry",
      "click",
      1
    );
  }

  goPreReservationPage() {
    this.googleAnalyticsService.eventEmitter(
      "store_pick_items",
      "engagement",
      "pre_reservation",
      "click",
      1
    );
    this.facebookPixelService.eventEmitter(
      "store_pick_items",
      "engagement",
      "pre_reservation",
      "click",
      1
    );
    this.router.navigateByUrl(
      `pre-reservation/name/${this.startName}/${this.marketingResultId}`
    );
  }
}
