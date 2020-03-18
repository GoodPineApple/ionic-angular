import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  // @Select(ProductState.getProductList) products: Observable<Group[]>;
  firstSlideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 10,
  }
  numbers;
  shopName;
  isRegistShop;

  constructor(
    private router: Router,
    private authService: AuthService,
    public modalController: ModalController
  ) { 
    this.numbers = Array(20);
  }
  
  async ngOnInit() {
    
  }

  // TODO 회원정보에 shopName이 없을 경우 모달 띄우고 픽토리지 이름을 입력받기.
}
