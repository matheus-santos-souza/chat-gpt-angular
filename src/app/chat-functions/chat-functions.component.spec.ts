import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFunctionsComponent } from './chat-functions.component';

describe('ChatComponent', () => {
  let component: ChatFunctionsComponent;
  let fixture: ComponentFixture<ChatFunctionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatFunctionsComponent]
    });
    fixture = TestBed.createComponent(ChatFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
