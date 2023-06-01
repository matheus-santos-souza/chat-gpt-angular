import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBancoComponent } from './chat-banco.component';

describe('ChatComponent', () => {
  let component: ChatBancoComponent;
  let fixture: ComponentFixture<ChatBancoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatBancoComponent]
    });
    fixture = TestBed.createComponent(ChatBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
