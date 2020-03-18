import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ProfileService } from "./profile.service";
import { Profile } from "src/app/models/Profile";
import { CommonService } from "../common/common.service";
import { Shop } from "src/app/models/Shop";
import { ShopService } from "../shop/shop.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  categories: any = {};
  constructor(
    private profileService: ProfileService,
    private shopService: ShopService,
    private commonService: CommonService
  ) {}

  async getUser(): Promise<Object> {
    let currentUser = firebase.auth().currentUser;
    return currentUser;
  }

  async getUserId(): Promise<string> {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      return currentUser.uid;
    } else return;
  }

  loginUser(
    email: string,
    password: string
  ): Promise<void | firebase.auth.UserCredential> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential: firebase.auth.UserCredential) => {
        console.log("[auth.service] loginUser");
        let profile: Profile = await this.profileService.getProfileByEmail(
          firebase.auth().currentUser.email
        );
        let shop: Shop = await this.shopService.getShopByProfileId(profile.id);
        this.commonService.setLocalStorage({
          profileId: profile.id,
          shopId: shop.id
        });
        if (!firebase.auth().currentUser.emailVerified) {
          this.logoutUser();
          throw {
            code: "auth/email-not-verified",
            error: new Error()
          };
        }
      });
  }

  loginUserWithGmail(): Promise<void> {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (result) {
          firebase
            .firestore()
            .doc(`/userProfile/${result.user.uid}`)
            .set({ email: result.user.email });
          firebase
            .firestore()
            .doc(`/userProfile/${result.user.uid}`)
            .update({ categories: {} });
        }
      });
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase.auth().currentUser.sendEmailVerification();
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
