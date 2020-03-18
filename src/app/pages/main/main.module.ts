import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MainPageRoutingModule } from "./main-routing.module";

import { MainPage } from "./main.page";
import { HeaderComponentModule } from "../common/header/header.component.module";
import { GroupListComponentModule } from "../../components/group/group-list/group-list.module";

import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { GroupState } from "../../states/group/group.state";
import { ProductState } from "../../states/product/product.state";

import { ProductCarouselStateComponentModule } from "../../components/product/product-carousel-state/product-carousel-state.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    HeaderComponentModule,
    NgxsModule.forRoot([GroupState, ProductState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ProductCarouselStateComponentModule,
    GroupListComponentModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
