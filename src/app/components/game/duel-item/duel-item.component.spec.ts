import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelItemComponent } from './duel-item.component';

describe('DuelItemComponent', () => {
  let component: DuelItemComponent;
  let fixture: ComponentFixture<DuelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
