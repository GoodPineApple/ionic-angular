import {
  Component,
  OnInit,
  Renderer,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { ProductService } from "src/app/services/product/product.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Store } from "@ngxs/store";

import { AddUpdatedRecommendProduct } from "../../../actions/marketing/recommend-product.action";

import { MarketingService } from "src/app/services/marketing/marketing.service";
import { GoogleAnalyticsService } from "../../../services/google-analytics/google-analytics.service";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.page.html",
  styleUrls: ["./item-list.page.scss"]
})
export class ItemListPage implements OnInit, OnDestroy {
  // TODO ViewResolverFactory를 사용하여 바뀔때마다 애니메이션 적용
  startName = "안녕";
  productArr;
  productFirst;
  proposeMarketingResultId = "";

  productIdx = 0;
  voteArr = [];
  marketingResultId: string;

  navigationSubscription;
  isSuccess: boolean = false;
  totalCard: number = 9;

  isFetchedAlready: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private marketingService: MarketingService,
    private store: Store,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.actRoute.params.subscribe(params => {
      this.startName = params["startName"];
      if (params["proposeMarketingResultId"]) {
        this.proposeMarketingResultId = params["proposeMarketingResultId"];
      }
    });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.productIdx = 0;
        if (!this.isFetchedAlready) {
          this.isFetchedAlready = true;
          console.log("item-list constructor");
          this.fetchData();
        }
      }
    });
  }

  async fetchData() {
    try {
      console.log("item-list fetch");
      const data = await this.marketingService.getRecommendProductArr(
        this.proposeMarketingResultId
      );
      console.log(data);
      this.productArr = data["product"];

      this.marketingResultId = data["marketingResultId"];

      this.productFirst = this.productArr[this.productIdx];

      this.isSuccess = true;
    } catch (err) {
      console.log(err);
    }
  }

  async ngOnInit() {
    if (!this.isFetchedAlready) {
      this.isFetchedAlready = true;
      await this.fetchData();
    }

    this.googleAnalyticsService.trackUserTiming("load_item_list_page");
    this.googleAnalyticsService.trackScreenView("item_list_page");
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  vote(favor) {
    if (this.productFirst && favor === "good") {
      this.productFirst["isVoted"] = true;
    } else if (this.productFirst && favor === "bad") {
      this.productFirst["isVoted"] = false;
    }

    this.googleAnalyticsService.eventEmitter(
      "user_vote",
      "engagement",
      `voted_${favor}`,
      "click",
      1
    );

    this.updateCard();
  }

  updateCard() {
    this.productIdx++;

    if (this.productFirst) {
      this.store.dispatch(new AddUpdatedRecommendProduct(this.productFirst));
    }

    this.productFirst = this.productArr[this.productIdx];

    if (this.productIdx === this.productArr.length) {
      this.isSuccess = false;
      this.isFetchedAlready = false;

      this.productIdx = 0;

      this.router.navigateByUrl(
        `item-result/name/${this.startName}/${this.marketingResultId}`
      );
    }
  }
}
