import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingalCompOneComponent } from './singal-comp-one.component';

describe('SingalCompOneComponent', () => {
  let component: SingalCompOneComponent;
  let fixture: ComponentFixture<SingalCompOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingalCompOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingalCompOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
