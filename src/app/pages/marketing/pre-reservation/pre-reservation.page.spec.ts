import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreReservationPage } from './pre-reservation.page';

describe('PreReservationPage', () => {
  let component: PreReservationPage;
  let fixture: ComponentFixture<PreReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreReservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
