import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations'
import { GroupService } from 'src/app/services/group/group.service';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class GroupListComponent implements OnInit {
  groupArr;
  navigationSubscription;

  // 예시데이터를 위한 변수
  GroupSlideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2.5,
    centeredSlides: true,
    spaceBetween: 10,
  }

  constructor(
    private router: Router,
    private groupService: GroupService,
    private alertCtrl: AlertController
  ) { 
    console.log("[group-list constructor]");
    
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   if (e instanceof NavigationEnd) {
    //     this.productIdx = 0;
    //     if (!this.isFetchedAlready) {
    //       this.isFetchedAlready = true;
    //       this.fetchData();
    //     }
    //   }
    // });
  }

  async ngOnInit() {
    this.groupArr = await this.groupService.getGroupArrByShopId(localStorage.shopId);
    console.log("[group-list ngOnInit]");
  }


  async addGroup(){
    const alert = await this.alertCtrl.create({
      subHeader: '새 그룹 만들기',
      inputs: [
        {
          type: 'text',
          name: 'groupName',
          placeholder: '그룹이름',
          value: "",
        },
        {
          type: 'text',
          name: 'groupDetail',
          placeholder: '그룹설명',
          value: "",
        }
      ],
      buttons: [
        { text: '취소' },
        {
          text: '저장',
          handler: async data => {
            let payload : any = {
              groupName : data.groupName,
              groupDetail : data.groupDetail,
              profileId: localStorage.profileId,
              shopId: localStorage.shopId,
            };
            // this.store.dispatch(new AddGroup(payload))
          }
        },
      ],
    });
    await alert.present();
  }

  goGrpDtl(grpId, group){
    console.log(grpId);
    // this.store.dispatch(new SetSelectedGroup(group));
    // this.router.navigateByUrl(`group/view/${grpId}`, { state: { group: group } });
    this.router.navigateByUrl(`group/view/${grpId}`);
  }

  eidtGroup(){
    alert("그룹수정화면");
  }

  shareGroup(grpId, group){
    console.log(grpId);
    alert("공유링크 생성해야함");
  }


}
