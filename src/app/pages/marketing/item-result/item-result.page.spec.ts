import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemResultPage } from './item-result.page';

describe('ItemResultPage', () => {
  let component: ItemResultPage;
  let fixture: ComponentFixture<ItemResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
