import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateResourceComponent } from './rate-resource.component';

describe('RateResourceComponent', () => {
  let component: RateResourceComponent;
  let fixture: ComponentFixture<RateResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
