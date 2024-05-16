import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngMatAutoCompleteComponent } from './ang-mat-auto-complete.component';

describe('AngMatAutoCompleteComponent', () => {
  let component: AngMatAutoCompleteComponent;
  let fixture: ComponentFixture<AngMatAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngMatAutoCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngMatAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
