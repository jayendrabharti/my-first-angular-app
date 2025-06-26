import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodo } from './new-todo';

describe('NewTodo', () => {
  let component: NewTodo;
  let fixture: ComponentFixture<NewTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
