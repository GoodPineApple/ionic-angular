import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Router, NavigationEnd } from "@angular/router";

import * as firebase from "firebase/app";
// import { Meta, Title } from "@angular/platform-browser";

declare let gtag: Function; // 구글 애널리틱스
declare let fbq: Function; // 페이스북 픽셀

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  isLoading = true

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    public router: Router,
    // public meta: Meta,
    // public title: Title
  ) {
    this.initializeApp();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlAfterRedirects = event.urlAfterRedirects;

        // TOFIX 배포 전에 변경 키 값 필요
        gtag("config", "", {
	page_path:''
	});
        gtag("config", "", {
          page_path: urlAfterRedirects
        });
        fbq("track", "PageView");

        if (
          urlAfterRedirects.includes("/start") &&
          urlAfterRedirects.includes("/name")
        ) {
          gtag("config", "", {
            page_path: urlAfterRedirects
          });
        }
      }
    });
  }

  initializeApp() {
    firebase.initializeApp({
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "shaashop-v2",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    });
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.isLoading = false;
    });
  }
}
