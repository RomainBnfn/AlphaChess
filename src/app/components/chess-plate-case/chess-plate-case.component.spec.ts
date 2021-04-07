import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessPlateCaseComponent } from './chess-plate-case.component';

describe('ChessPlateCaseComponent', () => {
  let component: ChessPlateCaseComponent;
  let fixture: ComponentFixture<ChessPlateCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessPlateCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessPlateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
