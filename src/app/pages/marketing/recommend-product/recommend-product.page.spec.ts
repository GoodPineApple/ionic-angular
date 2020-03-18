import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendProductPage } from './recommend-product.page';

describe('RecommendProductPage', () => {
  let component: RecommendProductPage;
  let fixture: ComponentFixture<RecommendProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
