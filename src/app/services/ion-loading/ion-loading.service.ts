import { Injectable } from "@angular/core";

import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class IonLoadingService {
  constructor(private loadingController: LoadingController) {}

  async presentLoading(message: string, duration: number) {
    const loading = await this.loadingController.create({
      message: message,
      duration: duration
    });

    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }
}
