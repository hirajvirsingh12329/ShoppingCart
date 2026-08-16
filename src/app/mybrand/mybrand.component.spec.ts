import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybrandComponent } from './mybrand.component';

describe('MybrandComponent', () => {
  let component: MybrandComponent;
  let fixture: ComponentFixture<MybrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
