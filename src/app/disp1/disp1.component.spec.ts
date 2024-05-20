import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Disp1Component } from './disp1.component';

describe('Disp1Component', () => {
  let component: Disp1Component;
  let fixture: ComponentFixture<Disp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Disp1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Disp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
