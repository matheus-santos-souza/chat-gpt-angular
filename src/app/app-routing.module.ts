import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatIntencaoComponent } from './chat-intencao/chat-intencao.component';
import { ChatBancoComponent } from './chat-banco/chat-banco.component';

const routes: Routes = [
  { path: '', redirectTo: 'perguntar', pathMatch: 'full' },
  {
    path: 'perguntar',
    component: ChatComponent
  },
  {
    path: 'intencao',
    component: ChatIntencaoComponent
  },
  {
    path: 'banco',
    component: ChatBancoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
