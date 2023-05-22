import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIntencaoComponent } from './chat-intencao.component';

describe('ChatComponent', () => {
  let component: ChatIntencaoComponent;
  let fixture: ComponentFixture<ChatIntencaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatIntencaoComponent]
    });
    fixture = TestBed.createComponent(ChatIntencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
