import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { InterceptorModule } from 'src/interceptors/interceptor.module';
import { MessageComponent } from './components/message/message.component';
import { SqlMessageComponent } from './components/sql-message/sql-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    MessageComponent,
    SqlMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    InterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
