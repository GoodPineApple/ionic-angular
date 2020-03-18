import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
// import { SplashScreen } from "@ionic-native/splash-screen/ngx";
// import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { ReactiveFormsModule } from "@angular/forms";
// import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
// import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
// import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
// import { GroupState } from "./states/group/group.state";
import { RecommendProductState } from "./states/marketing/recommend-product.state";
import { GoogleAnalyticsService } from "./services/google-analytics/google-analytics.service";
import { FacebookPixelService } from "./services/facebook-pixel/facebook-pixel.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ReactiveFormsModule,
    NgxsModule.forRoot([RecommendProductState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    // SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // InAppBrowser,
    GoogleAnalyticsService,
    FacebookPixelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
