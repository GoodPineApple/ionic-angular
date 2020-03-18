import { Injectable } from "@angular/core";
import { Profile } from "src/app/models/Profile";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ShopService } from "../shop/shop.service";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private shopService: ShopService) {}

  async getProfileByEmail(email: string): Promise<Profile> {
    console.log("[product.service getProductByProductId]");
    let profile: Profile;
    await firebase
      .firestore()
      .collection("userProfile")
      .where("email", "==", `${email}`)
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          let data = doc.data();
          let temp: Profile;
          temp = {
            id: doc.id,
            email: data.email,
            photoUrl: data.photoUrl,
            name: data.name,
            createUid: data.createUid,
            updateUid: data.updateUid,
            createDate: data.createDate,
            updateDate: data.updateDate
          };
          profile = temp;
        });
      });
    console.log(profile);
    return profile;
  }

  async addProfileWithShop(param: any) {
    console.log("[profile.service addProfile]");
    console.log(param);
    /* 
      TODO 
      firebase email 인증하기 전까지는 uservalid와 같은 문서를 만들어서 shopname을 저장해 뒀다가,
      사용자가 인증까지 완료하면, 그 타이밍에 생성된 사용자의 UID를 기반으로 profile 도큐먼트와 shop정보를 생성해야함.
      이 작업은 후로 미루고 일단 전체 앱 구현부터 진행함.  
    */
    let profile: Profile = {
      id: "",
      email: param.email,
      photoUrl: "",
      name: "",
      createUid: 1,
      updateUid: 1,
      createDate: firebase.firestore.Timestamp.fromDate(new Date()),
      updateDate: firebase.firestore.Timestamp.fromDate(new Date())
    };
    let profileRef = await firebase
      .firestore()
      .collection("userProfile")
      .doc();

    profile.id = profileRef.id;

    await profileRef.set(profile).then(
      resp => {
        console.log(resp);
      },
      error => {}
    );

    param.profileId = profileRef.id;
    var shop = await this.shopService.addShop(param);
    console.log(shop);
    return profile;
  }
}
