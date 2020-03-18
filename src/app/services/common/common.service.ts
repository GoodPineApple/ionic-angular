import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 10,
  }

  getSlideOptionProduct(){
    return this.slideOpts;
  }

  setLocalStorage(param:any){
    console.log("[common service] setLocalStorage");
    if(param.profileId != null){
      console.log("param.profileId is not null");
      localStorage.profileId = param.profileId;
    }
    if(param.shopId != null){
      console.log("param.shopId is not null");
      localStorage.shopId = param.shopId;
    }
  }
}
