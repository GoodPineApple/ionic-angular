import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngxs/store";

import { MarketingService } from "../../../services/marketing/marketing.service";
import { IonLoadingService } from "../../../services/ion-loading/ion-loading.service";

import { GetRecommendProduct } from "../../../actions/marketing/recommend-product.action";
import { ActivatedRoute } from "@angular/router";

import { GoogleAnalyticsService } from "../../../services/google-analytics/google-analytics.service";
import { FacebookPixelService } from "../../../services/facebook-pixel/facebook-pixel.service";

@Component({
  selector: "app-pre-reservation",
  templateUrl: "./pre-reservation.page.html",
  styleUrls: ["./pre-reservation.page.scss"]
})
export class PreReservationPage implements OnInit {
  startName: string;
  updatedRecommendProduct;
  userEmail: string;
  isEnrolled: boolean = false;
  marketingResultId = "";

  formGroup: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private marketingService: MarketingService,
    private formBuilder: FormBuilder,
    private store: Store,
    private googleAnalyticsService: GoogleAnalyticsService,
    private facebookPixelService: FacebookPixelService,
    private router: Router,
    private ionLoadingService: IonLoadingService
  ) {
    this.actRoute.params.subscribe(params => {
      this.startName = params["startName"];
      this.marketingResultId = params["marketingResultId"];
    });

    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ])
      ]
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetRecommendProduct()).subscribe(data => {
      this.updatedRecommendProduct = data.recommend_product.recommendProductArr;
    });

    this.googleAnalyticsService.trackUserTiming("load_pre_reservation_page");
    this.googleAnalyticsService.trackScreenView("pre_reservation_page");
  }

  ngOnDestroy() {
    this.isEnrolled = false;
  }

  async handleReservationButton(email) {
    // 서버에서 이메일 무결성 확인 필요 (2020-03-15)
    if (this.formGroup.controls["email"].valid && email && !this.isEnrolled) {
      try {
        await this.ionLoadingService.presentLoading(
          "등록중입니다. 잠시만 기다려주세요",
          2000
        );

        await this.marketingService
          .addPreReservation(
            this.updatedRecommendProduct,
            email,
            this.marketingResultId
          )
          .then(() => {
            this.ionLoadingService.dismissLoading();
          });

        this.googleAnalyticsService.eventEmitter(
          "enroll_pre_reservation",
          "engagement",
          "enroll",
          "click",
          1
        );

        this.facebookPixelService.eventEmitter(
          "enroll_pre_reservation",
          "engagement",
          "enroll",
          "click",
          1
        );

        alert("픽토리지 사전예약이 완료되었습니다! 감사합니다.");
        this.isEnrolled = true;
        this.router.navigateByUrl(
          `item-result/name/${this.startName}/${this.marketingResultId}`
        );
      } catch (err) {
        console.log(err);
      }
    } else if (email && this.isEnrolled) {
      alert("이미 등록이 완료되었습니다.");
    } else if (!email) {
      alert("이메일을 입력해주세요.");
    }
  }
}
