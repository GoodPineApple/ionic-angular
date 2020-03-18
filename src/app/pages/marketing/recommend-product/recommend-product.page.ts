import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";

import { MarketingService } from "src/app/services/marketing/marketing.service";
import { GoogleAnalyticsService } from "../../../services/google-analytics/google-analytics.service";
import { FacebookPixelService } from "../../../services/facebook-pixel/facebook-pixel.service";

import { GetRecommendProduct } from "../../../actions/marketing/recommend-product.action";

@Component({
  selector: "app-recommend-product",
  templateUrl: "./recommend-product.page.html",
  styleUrls: ["./recommend-product.page.scss"]
})
export class RecommendProductPage implements OnInit {
  startName;
  marketingResultId;
  recommendProductArr;
  location: string = "recommend_page";

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private googleAnalyticsService: GoogleAnalyticsService,
    private facebookPixelService: FacebookPixelService,
    private store: Store
  ) {
    this.actRoute.params.subscribe(params => {
      this.startName = params["startName"];
      this.marketingResultId = params["marketingResultId"];
    });
  }

  ngOnInit() {
    this.store
      .dispatch(new GetRecommendProduct())
      .subscribe(
        state =>
          (this.recommendProductArr =
            state.recommend_product.recommendProductArr)
      );

    this.googleAnalyticsService.trackUserTiming("load_recommend_product_page");
    this.googleAnalyticsService.trackScreenView("recommend_product_page");
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
