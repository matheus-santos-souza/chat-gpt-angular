import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatIntencaoComponent } from './chat-intencao/chat-intencao.component';
import { ChatBancoComponent } from './chat-banco/chat-banco.component';
import { ChatFunctionsComponent } from './chat-functions/chat-functions.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatIntencaoComponent,
    ChatBancoComponent,
    ChatFunctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
