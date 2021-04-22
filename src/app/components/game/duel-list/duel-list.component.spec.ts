import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelListComponent } from './duel-list.component';

describe('DuelListComponent', () => {
  let component: DuelListComponent;
  let fixture: ComponentFixture<DuelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
