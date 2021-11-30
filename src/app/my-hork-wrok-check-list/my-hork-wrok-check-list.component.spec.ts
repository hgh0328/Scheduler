import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHorkWrokCheckListComponent } from './my-hork-wrok-check-list.component';

describe('MyHorkWrokCheckListComponent', () => {
  let component: MyHorkWrokCheckListComponent;
  let fixture: ComponentFixture<MyHorkWrokCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHorkWrokCheckListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHorkWrokCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
