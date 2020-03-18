import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupViewPage } from './group-view.page';

describe('GroupViewPage', () => {
  let component: GroupViewPage;
  let fixture: ComponentFixture<GroupViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
