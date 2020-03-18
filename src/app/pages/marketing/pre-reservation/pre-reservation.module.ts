import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PreReservationPageRoutingModule } from "./pre-reservation-routing.module";

import { PreReservationPage } from "./pre-reservation.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreReservationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PreReservationPage]
})
export class PreReservationPageModule {}
