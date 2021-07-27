import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInfoPageComponent } from './trip-info-page.component';

describe('TripInfoPageComponent', () => {
  let component: TripInfoPageComponent;
  let fixture: ComponentFixture<TripInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
