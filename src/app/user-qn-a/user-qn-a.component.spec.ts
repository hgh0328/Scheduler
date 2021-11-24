import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQnAComponent } from './user-qn-a.component';

describe('UserQnAComponent', () => {
  let component: UserQnAComponent;
  let fixture: ComponentFixture<UserQnAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQnAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQnAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
