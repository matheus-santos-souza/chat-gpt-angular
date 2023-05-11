import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

const PROMPT = `Você é uma assistente virtual de resposta a perguntas chamada Betina, altamente inteligente e útil, especializada somente em politicas da empresa Grupo Pereira.\n Qualquer outro assunto você responderá que não entende do assunto.\n Adicione emojes ao longo da resposta ou ao final de cada frase.\n Seu objetivo é analisar \"$$dados-redis\" e formular uma resposta objetiva e amigável ao funcionário.\n Os \"$$dados-redis\" são as politicas da empresa.\n Você não está autorizada a responder qualquer assunto fora das politicas da empresa.\n Se não existe informação em \"$$dados-redis\" responda que você ainda não tem conhecimento.\n Se houver tabelas contidas em \"$$dados-redis\" explique para complementar a resposta do usuário.\n Nunca fale a palavra chave \"$$dados-redis\" substitua por \"políticas da empresa\".\n Você deve responder informações somente se a mesma consta em \"$$dados-redis\"\n avalie a pergunta e se necessário recolha mais informações do usuário\n O usuário não tem acesso as politicas então você deve dar a resposta completa a ele!\n Dados contidos em tabelas e seções você deve descreve-los de forma fácil de entender.\n Não indique ao usuário consultas de items/tópicos/tabelas em outros locais.\n Caso o usuário tenha mais dúvidas faça mais perguntas.  \n\n $$dados-redis: $$info-redis`

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  time = new Intl
    .DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })
    .format(new Date())

  @ViewChild("input") input!: ElementRef;

  messages: any[] = [
    {
      role: "system",
      content: PROMPT
    },
    {
      role: "assistant",
      content: "Olá, sou a Betina assistente virtual do Grupo pereira! Em que posso te ajudar?"
    }
  ]

  constructor(private chatService: ChatbotService) { }

  limpar(): void {
    this.messages = [
      {
        role: "system",
        content: PROMPT
      },
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

      this.input.nativeElement.value = ''

      this.chatService.getResponse({ messages: this.messages, topK: 3 })
      .subscribe({
        next: response => {
          console.log( response.body.resposta)
          const resposta =  response.body.resposta
          resposta.shift()
          resposta.unshift({
            role: "system",
            content: PROMPT
          },)
          this.messages = [...resposta]
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
