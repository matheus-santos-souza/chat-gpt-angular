import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlMessageComponent } from './sql-message.component';

describe('SqlMessageComponent', () => {
  let component: SqlMessageComponent;
  let fixture: ComponentFixture<SqlMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SqlMessageComponent]
    });
    fixture = TestBed.createComponent(SqlMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
