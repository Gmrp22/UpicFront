import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedresourcesComponent } from './savedresources.component';

describe('SavedresourcesComponent', () => {
  let component: SavedresourcesComponent;
  let fixture: ComponentFixture<SavedresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
