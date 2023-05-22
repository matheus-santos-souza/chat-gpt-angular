import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';


@Component({
  selector: 'app-chat-intencao',
  templateUrl: './chat-intencao.component.html',
  styleUrls: ['./chat-intencao.component.scss']
})
export class ChatIntencaoComponent {
  time = new Intl
    .DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })
    .format(new Date())

  @ViewChild("input") input!: ElementRef;

  messages: any[] = [
    {
      role: "assistant",
      content: "Olá, sou a Betina assistente virtual do Grupo pereira! Em que posso te ajudar?"
    }
  ]

  constructor(private chatService: ChatbotService) { }

  limpar(): void {
    this.messages = [
      {
        role: "assistant",
        content: "Olá, sou a Betina assistente virtual do Grupo pereira! Em que posso te ajudar?"
      }
    ]
  }

  async enviar(): Promise<any> {
    if (this.input.nativeElement.value !== '') {
      this.messages.push({
        role: "user",
        content: this.input.nativeElement.value
      })

      const input = this.input.nativeElement.value
      this.input.nativeElement.value = ''

      this.chatService.getIntencao({ input, tags: 'funcionalidades' })
      .subscribe({
        next: response => {
          console.log(response.body.resposta)

          const respostas =  response.body.resposta
          if (respostas.length === 0) {
            this.messages.push(
              {
                role: "assistant",
                content: "Não entendi muito bem 🙋‍♀️! Você pode descrever melhor qual opção deseja acessar?"
              },
              {
                role: "assistant",
                content: `Ou acesse o "Menu" para navegar em todas as opções!`
              }
            )
          }

          if (respostas.length === 1) {
            this.messages.push(
              {
                role: "assistant",
                content: `Certo! Aguarde enquanto retorno a resposta de ${respostas[0].value.title}`
              }
            )
          }

          if (respostas.length > 5) {
            const funcionalidades = respostas.map((resposta: any) => resposta.value.title)
            const opcoes = funcionalidades.slice(0, 9)
            this.messages.push(
              {
                role: "assistant",
                content: `Desculpe 🙋‍♀️, parece que tenho muitas opções que podem te ajudar sobre esse assunto! aqui vai algumas delas:`
              },
              {
                role: "assistant",
                content: `${opcoes.join(' | ')}`
              },
              {
                role: "assistant",
                content: `Escolha uma das opções acima!👆 ou acesse o "Menu" para navegar em todas as opções!`
              }
            )
          }

          if (respostas.length > 1 && respostas.length <= 5) {
            const funcionalidades = respostas.map((resposta: any) => resposta.value.title)
            this.messages.push(
              {
                role: "assistant",
                content: `Achei algumas opções que podem te ajudar:`
              },
              {
                role: "assistant",
                content: `${funcionalidades.join(' | ')}`
              },
              {
                role: "assistant",
                content: `Escolha uma das opções acima!👆 ou acesse o "Menu" para navegar em todas as opções!`
              }
            )
          }
        },
        error: error => {
          this.messages.push({
            role: "assistant",
            content: "Algo deu errado... desculpe o trasntorno! 🙋‍♀️"
          })
        },
      });
    }
  }

}
