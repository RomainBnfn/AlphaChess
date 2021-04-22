import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentItemComponent } from './opponent-item.component';

describe('OpponentItemComponent', () => {
  let component: OpponentItemComponent;
  let fixture: ComponentFixture<OpponentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpponentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
