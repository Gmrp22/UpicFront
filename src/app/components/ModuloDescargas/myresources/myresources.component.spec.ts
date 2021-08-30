import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyresourcesComponent } from './myresources.component';

describe('MyresourcesComponent', () => {
  let component: MyresourcesComponent;
  let fixture: ComponentFixture<MyresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
