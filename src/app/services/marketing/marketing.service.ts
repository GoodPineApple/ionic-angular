import { Injectable } from "@angular/core";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ProductService } from "../product/product.service";
import { HttpClient } from "@angular/common/http";

import { PreReservation } from "../../models/PreReservation";
import { RecommendProduct } from "../../models/Product";

import { UserDataForMarketing } from "../../models/User";

@Injectable({
  providedIn: "root"
})
export class MarketingService {
  recommendedProductArr = [];
  // NodeDomain = "http://localhost:8080"
  NodeDomain = "https://shaashop-v2.appspot.com";

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  async getMarketingResult(marketingResultId: string) {
    console.log("[marketing.service getMarketingResult]");
    let marketingResult = {};
    await firebase
      .firestore()
      .collection("marketingResult")
      .doc(`${marketingResultId}`)
      .get()
      .then(docs => {
        marketingResult = docs.data();
      });
    let product = await this.productService.getProductByProductId(
      marketingResult["productId"]
    );
    marketingResult["product"] = product;
    return marketingResult;
  }

  getRecommendProductArr(proposeMarketingResultId: string) {
    console.log("marketing.service getRecommendProductArr");
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(this.NodeDomain + "/marketing/recommend-product", {
          proposeMarketingResultId: proposeMarketingResultId
        })
        .toPromise()
        .then(
          (res: any) => {
            resolve(res);
          },
          err => {
            console.error(err);
            reject(err);
          }
        );
    });
    return promise;
  }

  getRecommendProductResult(voteArr, id) {
    console.log("marketing.service getRecommendProductResult");
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(this.NodeDomain + "/marketing/recommend-product-result", {
          param: voteArr,
          marketingResultId: id
        })
        .toPromise()
        .then(
          (res: any) => {
            console.log(res);
            resolve(res);
          },
          err => {
            console.error(err);
            reject(err);
          }
        );
    });
    return promise;
  }

  postNewUserBySharedLink(userData: UserDataForMarketing) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(this.NodeDomain + "/marketing/link-share-entered", {
          param: userData
        })
        .toPromise()
        .then(
          (res: any) => {
            console.log(res);
            resolve(res);
          },
          err => {
            console.error(err);
            reject(err);
          }
        );
    });
    return promise;
  }

  postUserDataForMarketing(userData: UserDataForMarketing) {
    const promise = new Promise((resolve, reject) => {
      console.log(userData);
      this.http
        .post(this.NodeDomain + "/marketing/link-share", {
          param: userData
        })
        .toPromise()
        .then(
          (res: any) => {
            console.log(res);
            resolve(res);
          },
          err => {
            console.error(err);
            reject(err);
          }
        );
    });
    return promise;
  }

  replaceContentStartName(content: string, startName: string) {
    return content.replace(/startName/g, startName);
  }

  async addPreReservation(
    productData: any,
    userEmail: string,
    marketingResultId: string
  ) {
    //TOFIX productData 타입 설정 필요
    const payload: PreReservation = {
      email: userEmail,
      userPickData: productData,
      marketingResultId: marketingResultId,
      createDate: firebase.firestore.Timestamp.fromDate(new Date()),
      updateDate: firebase.firestore.Timestamp.fromDate(new Date())
    };
    const preReservationRef = await firebase
      .firestore()
      .collection("preReservation")
      .doc();

    if (preReservationRef.id) {
      await preReservationRef.set(payload);
      return preReservationRef.id;
    }
  }
}
