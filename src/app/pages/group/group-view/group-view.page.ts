import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';
import { Router, NavigationExtras } from '@angular/router';

import { GroupState } from '../../../states/group/group.state';
import { Select, Store } from '@ngxs/store';
import { Group } from '../../../models/Group';
import { Observable } from 'rxjs';
import { GetGroupView } from '../../../actions/group/group.action';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.page.html',
  styleUrls: ['./group-view.page.scss'],
})
export class GroupViewPage implements OnInit {
  @Select(GroupState.getSelectedGroup) group$: Observable<Group>;

  constructor(
    private router: Router,
    private store: Store
  ) { 
    console.log("[group-view.page constructor]");
    // group$ = store.dispatch(new getSelectedGroup());
    if(this.router.getCurrentNavigation().extras.state){
      this.store.dispatch(new GetGroupView(""));
    }else{
      console.log("??")
    }
  }

  ngOnInit() {
  }

}
