import { Injectable } from "@angular/core";

import { Product } from "../../models/Product";
import { HttpClient } from "@angular/common/http";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {
    console.log("[product.service constructor]");
  }

  async getProductByProductId(productId: string) {
    console.log("[product.service getProductByProductId]");
    let product = {};
    await firebase
      .firestore()
      .collection("product")
      .doc(`${productId}`)
      .get()
      .then(docs => {
        product = docs.data();
      });
    console.log(product);
    return product;
  }

  async getMarketingProductList() {
    console.log("[product.service getMarketingProductList]");
    // console.log(groupId);
    let productArr = [];
    await firebase
      .firestore()
      .collection("product")
      .limit(10)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          let data = doc.data();
          let temp: Product;
          temp = {
            id: doc.id,
            productName: data.productName,
            productImgUrl: data.productImgUrl,
            status: data.status,
            groupId: data.groupId,
            productPrice: data.productPrice,
            productCurrency: data.productCurrency,
            productOption: data.productOption,
            productDetail: data.productDetail,
            shopSiteName: data.shopSiteName,
            shopSiteUrl: data.shopSiteUrl,
            profileId: data.profileId,
            shopId: data.shopId,
            createUid: data.createUid,
            updateUid: data.updateUid,
            createDate: data.createDate,
            updateDate: data.updateDate
          };
          productArr.push(temp);
        });
      });

    // console.log(productArr)
    return productArr;
  }

  async getProductArr(groupId: string) {
    console.log("[product.service getProductArr]");
    // console.log(groupId);
    let productArr = [];
    await firebase
      .firestore()
      .collection("product")
      // .where("groupId", "==", "UJsG8M4ec8MH4c3YivwQ")
      .where("groupId", "==", `${groupId}`)
      // .orderBy("createDate", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          let data = doc.data();
          let temp: Product;
          temp = {
            id: doc.id,
            productName: data.productName,
            productImgUrl: data.productImgUrl,
            status: data.status,
            groupId: data.groupId,
            productPrice: data.productPrice,
            productCurrency: data.productCurrency,
            productOption: data.productOption,
            productDetail: data.productDetail,
            shopSiteName: data.shopSiteName,
            shopSiteUrl: data.shopSiteUrl,
            profileId: data.profileId,
            shopId: data.shopId,
            createUid: data.createUid,
            updateUid: data.updateUid,
            createDate: data.createDate,
            updateDate: data.updateDate
          };
          productArr.push(temp);
        });
      });
    // console.log(productArr)
    return productArr;
  }

  deleteProduct(id: number) {
    console.log("[product.service deleteProduct]");
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  async addProduct(param: Product) {
    console.log("[product.service addProduct]");
    console.log(param);
    let product: Product = {
      id: "",
      productName: param.productName,
      productImgUrl: param.productImgUrl,
      status: "R",
      groupId: param.groupId,
      productPrice: param.productPrice,
      productCurrency: param.productCurrency,
      productOption: param.productOption,
      productDetail: param.productDetail,
      shopSiteName: param.shopSiteName,
      shopSiteUrl: param.shopSiteUrl,
      profileId: param.profileId,
      shopId: param.shopId,
      createUid: 1,
      updateUid: 1,
      createDate: firebase.firestore.Timestamp.fromDate(new Date()),
      updateDate: firebase.firestore.Timestamp.fromDate(new Date())
    };
    const productRef = await firebase
      .firestore()
      .collection("product")
      .doc();
    product.id = productRef.id;
    await productRef.set(product).then(resp => {
      console.log(resp);
    });
    return product;
  }

  updateProduct(payload: Product, id: number) {
    console.log("[product.service updateProduct]");
    return this.http.put<Product>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      payload
    );
  }
}
