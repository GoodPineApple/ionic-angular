import { Injectable } from '@angular/core';
import { Shop } from 'src/app/models/Shop';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }

  async getShopByProfileId(profileId : string) : Promise<Shop> {
    console.log("[shop.service getShopByProfileId]");
    let shop: Shop ;
    await firebase.firestore().collection("shop")
      .where("profileId", "==", `${profileId}`)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map(doc => {
          let data = doc.data();
          let temp : Shop;
          temp = {
            id : doc.id,
            name : data.name,
            photoUrl : data.photoUrl,
            profileId : data.profileId,
            createUid : data.createUid,
            updateUid : data.updateUid,
            createDate : data.createDate,
            updateDate : data.updateDate
          };
          shop = temp;
        })
    });
    return shop;
  }

  async addShop(param: any) {
    console.log("[shop.service addProfile]");
    console.log(param);
    let shop : Shop = {
      id : "",
      name : param.shopName,
      photoUrl : "",
      profileId : param.profileId,
      createUid : 1,
      updateUid : 1,
      createDate : firebase.firestore.Timestamp.fromDate(new Date()),
      updateDate : firebase.firestore.Timestamp.fromDate(new Date())
    };
    let shopRef = await firebase.firestore().collection("shop").doc();
    shop.id = shopRef.id;
    await shopRef
      .set(shop)
      .then((resp) => {
        console.log(resp)
      })
    return shop;
  }

  setShopName(shopId:string, shopName:string){
    firebase.firestore().collection("shop")
      .doc(shopId)
      .update({
        'name': shopName
      })
  }

}
