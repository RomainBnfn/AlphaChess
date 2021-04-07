import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessPawnComponent } from './chess-pawn.component';

describe('ChessPawnComponent', () => {
  let component: ChessPawnComponent;
  let fixture: ComponentFixture<ChessPawnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessPawnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessPawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
