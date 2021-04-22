import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessPlateComponent } from './chess-plate.component';

describe('ChessPlateComponent', () => {
  let component: ChessPlateComponent;
  let fixture: ComponentFixture<ChessPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessPlateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
