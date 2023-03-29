import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleCardComponent } from './ecole-card.component';

describe('EcoleCardComponent', () => {
  let component: EcoleCardComponent;
  let fixture: ComponentFixture<EcoleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcoleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
