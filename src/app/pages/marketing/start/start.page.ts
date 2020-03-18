import { Component, OnInit, OnDestroy } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

import { Store } from "@ngxs/store";

import { MarketingService } from "../../../services/marketing/marketing.service";
import { UserDataForMarketing } from "../../../models/User";

import { ClearRecommendProduct } from "../../../actions/marketing/recommend-product.action";

import { GoogleAnalyticsService } from "../../../services/google-analytics/google-analytics.service";

import { FacebookPixelService } from "../../../services/facebook-pixel/facebook-pixel.service";

@Component({
  selector: "app-start",
  templateUrl: "./start.page.html",
  styleUrls: ["./start.page.scss"]
})
export class StartPage implements OnInit {
  userDataForMarketing: UserDataForMarketing = new UserDataForMarketing();
  navigationSubscription;
  // formGroup: FormGroup;

  constructor(
    private router: Router,
    private marketingService: MarketingService,
    private actRoute: ActivatedRoute,
    // private formBuilder: FormBuilder,
    private store: Store,
    private googleAnalyticsService: GoogleAnalyticsService,
    private facebookFixelService: FacebookPixelService
  ) {
    // this.createForm();
  }

  ngOnInit() {
    this.store.dispatch(new ClearRecommendProduct());
    if (window.location.href.includes("/name")) {
      this.actRoute.params.subscribe(params => {
        this.userDataForMarketing.name = params.name;
        this.userDataForMarketing.marketingResultId = params.marketingResultId;
      });
      this.marketingService.postNewUserBySharedLink(this.userDataForMarketing);
    }

    this.googleAnalyticsService.trackUserTiming("load_start_page");
    this.googleAnalyticsService.trackScreenView("start_page");
  }

  // createForm() {
  //   this.formGroup = this.formBuilder.group({
  //     name: [
  //       "",
  //       Validators.compose([
  //         Validators.maxLength(10),
  //         Validators.pattern("^[가-힣a-zA-Z]+$"),
  //         Validators.required
  //       ])
  //     ]
  //   });
  // }

  goItemList(startName) {
    if (!startName) alert("이름을 입력해주세요.");
    // if (
    //   this.formGroup.controls["name"].valid &&
    //   startName &&
    //   startName.length > 0
    // )
    // {
    if (startName) {
      this.googleAnalyticsService.eventEmitter(
        "start_pick_game",
        "engagement",
        "game_start",
        "click",
        1
      );
      this.facebookFixelService.eventEmitter(
        "start_pick_game",
        "engagement",
        "game_start",
        "click",
        1
      );

      if (this.userDataForMarketing.marketingResultId) {
        // 추천ID 추가
        this.router.navigateByUrl(
          `item-list/name/${startName}/propose/${this.userDataForMarketing.marketingResultId}`
        );
      } else {
        this.router.navigateByUrl(`item-list/name/${startName}`);
      }
    }
    // }
  }

  trackUserInputClick() {
    this.googleAnalyticsService.eventEmitter(
      "click_name_input",
      "engagement",
      "name_input",
      "click",
      1
    );
  }
}
