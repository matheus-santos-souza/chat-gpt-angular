import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

/* const PROMPT = `$$assunto: $$assunto-redis
$$dados-redis: $$info-redis

Você é uma assistente virtual chamada Betina, altamente inteligente e útil, especializada politicas da empresa Grupo Pereira.
Qualquer outro assunto você responderá que não entende do assunto.
Adicione emojes ao longo da resposta ou ao final de cada frase.
Seu objetivo é explicar o texto contido em \"$$dados-redis\" sobre o assunto contido em "$$assunto\" de forma amigável e fácil de entender.
Os \"$$dados-redis\" são as politicas da empresa.
O \"$$assunto\" é o titulo da politica.
Se a pergunta do usuário for diferente do assunto contido em \"$$assunto\" mande ele digitar \"#assunto\" para acessar outros assuntos.
Qualquer assunto fora das politicas da empresa  mande o usuário digitar \"#assunto\" para acessar outros assuntos.
Se não existe informação em \"$$dados-redis\" responda que você ainda não tem conhecimento ou mande ele digitar \"#assunto\" para acessar outros assuntos.
Se houver tabelas contidas em \"$$dados-redis\" explique para complementar a resposta do usuário.
Nunca fale a palavra chave \"$$dados-redis\" substitua por \"políticas da empresa\".
Avalie a pergunta e se necessário recolha mais informações do usuário.
Dados contidos em tabelas e seções você deve descreve-los de forma fácil de entender.
Não indique ao usuário consultas de items/tópicos/tabelas/politicas da empresa em outros locais.

pergunta: $$pergunta
resposta: ` */

/* const PROMPT =
`Você é uma assistente virtual chamada Betina, altamente inteligente e útil, especializada nas políticas do Grupo Pereira. Seu conhecimento se limita a esse assunto específico, portanto, para qualquer outra pergunta, você informará que não entende do assunto.

Responda às perguntas apenas usando o contexto e dados do Funcionário abaixo. Explique todas as informações de maneira amigável e acessível, oferecendo aos funcionários uma compreensão clara das políticas do Grupo Pereira.
Em "Funcionários" contém dados úteis do funcionário.
Em "Assunto" contém o assunto da política.
Em "Contexto" contém tópicos das politicas da empresa.
Ao final de cada resposta pergunte se você pode ajudar em algo mais.
Ao final da resposta explique a mesma usando os dados do funcionário abaixo

Funcionário:
-Nome: Matheus Santos de Souza
-Data de admissão: 13/03/2023
-Cargo: Análista chatbot jr
-Ferias marcada: NÃO
-Inicio do periodo aquisitivo: 13/03/2023
-Fim do periodo aquisitivo: 12/03/2024

Assunto: $$assunto-redis

Contexto: $$info-redis.` */

const PROMPT =
`Você é uma assistente virtual chamada Betina, altamente inteligente e útil, especializada análise de vendas e calculos matemáticos do Grupo Pereira. Seu conhecimento se limita a esse assunto específico, portanto, para qualquer outra pergunta, você informará que não entende do assunto.
Perguntas fora do assunto você está proibido de responder.

Analise dados JSON contido no contexto e forneça respostas análiticas e detalhadas.
Para calculos matemáticos informe passo a passo como chegou no resultado.
Os dados obrigatórios que o usuário deve informar são: data da venda e Nome da loja.
Ao final de cada resposta pergunte se você pode ajudar em algo mais.

Assunto: $$assunto-redis
Contexto:
$$info-redis.`


@Component({
  selector: 'app-chat-banco',
  templateUrl: './chat-banco.component.html',
  styleUrls: ['./chat-banco.component.scss']
})
export class ChatBancoComponent  {
  isIntent = false;
  tags = ''
  loading = false

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
      content: "Olá, sou a Betina assistente virtual do Grupo pereira! Sobre qual assunto deseja conversar?"
    }
  ]

  constructor(private chatService: ChatbotService) { }


  limpar(): void {
    this.isIntent = false
    this.tags = ''
    this.messages = [
      {
        role: "system",
        content: PROMPT
      },
      {
        role: "assistant",
        content: "Olá, sou a Betina assistente virtual do Grupo pereira! Sobre qual assunto deseja conversar?"
      }
    ]
  }

  async enviar(): Promise<any> {
    const input = this.input.nativeElement.value

    if (this.input.nativeElement.value !== '') {
      this.messages.push({
        role: "user",
        content: input
      })

      this.input.nativeElement.value = ''

      if (!this.isIntent) {
        await this.buscarIntencao(input)
      } else if (this.isIntent && input === '#assunto') {
        this.isIntent = false
        this.messages = [
          {
            role: "system",
            content: PROMPT
          },
          {
            role: "assistant",
            content: "Certo, qual outro assunto deseja conversar?"
          }
        ]
      } else {
        this.loading = true
        const resultMessages = this.messages.map((message) => {
          return {
            role: message.role,
            content: message.content
          }
        })
        this.chatService.getResponseBanco({ messages: resultMessages, topK: 30, tags: this.tags })
        .subscribe({
          next: response => {
            const resposta =  response.body.resposta
            this.messages.shift()
            this.messages.unshift({
              role: "system",
              content: PROMPT
            },)
            const result = [...resposta ].pop()
            result.isRespostaVerificada = response.body?.isRespostaVerificada
            this.messages.push(result)
            this.loading = false
          },
          error: error => {
            this.messages.push({
              role: "assistant",
              content: "Algo deu errado... desculpe o trasntorno! 🙋‍♀️"
            })
            this.loading = false
          },
        });
      }

    }
  }

  async buscarIntencao(input: string) {
    this.loading = true
    this.chatService.getIntencao({ input, tags: 'banco' })
      .subscribe({
        next: response => {
          const respostas =  response.body.resposta
          if (respostas.length === 0) {
            this.messages.push(
              {
                role: "assistant",
                content: `Não entendi muito bem 🙋‍♀️! Você pode descrever melhor qual assunto deseja conversar? \nOu acesse o "Menu" para navegar em todos os assuntos!`
              }
            )
          }

          if (respostas.length === 1) {
            this.messages.push(
              {
                role: "assistant",
                content: `Certo! Vamos convesar sobre o assunto ${respostas[0].value.title} do Grupo Pereira! \nPara escolher outro assunto digite #assunto em qualquer ponto da conversa!`
              },
              {
                role: "assistant",
                content: `Em que posso te ajudar?`
              }
            )
            this.isIntent = true
            this.tags = respostas[0].value.title
          }

          if (respostas.length > 5) {
            const funcionalidades = respostas.map((resposta: any) => resposta.value.title)
            const opcoes = funcionalidades.slice(0, 9)
            this.messages.push(
              {
                role: "assistant",
                content: `Desculpe 🙋‍♀️, parece que tenho muitos assuntos que podem te ajudar! aqui vai algumas delas: \n${opcoes.map((text: string) => `- ${text}`).join('\n')} \n\nEscolha uma das opções acima!👆 ou acesse o "Menu" para navegar em todas as opções!`
              }
            )
          }

          if (respostas.length > 1 && respostas.length <= 5) {
            const funcionalidades = respostas.map((resposta: any) => resposta.value.title)
            this.messages.push(
              {
                role: "assistant",
                content: `Achei alguns assuntos que podem te ajudar: \n${funcionalidades.map((text: string) => `- ${text}`).join('\n')} \n\nEscolha um dos assuntos acima!👆 ou acesse o "Menu" para navegar em todas as opções!`
              }
            )
          }
          this.loading = false
        },
        error: error => {
          this.messages.push({
            role: "assistant",
            content: "Algo deu errado... desculpe o trasntorno! 🙋‍♀️"
          })
          this.loading = false
        },
      });
  }

}
