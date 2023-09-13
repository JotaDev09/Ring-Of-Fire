import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartScreenComponentComponent } from './start-screen.component';

describe('StartScreenComponentComponent', () => {
  let component: StartScreenComponentComponent;
  let fixture: ComponentFixture<StartScreenComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartScreenComponentComponent]
    });
    fixture = TestBed.createComponent(StartScreenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
