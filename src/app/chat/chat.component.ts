import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import hljs from 'highlight.js';
import { format } from 'sql-formatter';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  highlightedCode: string = '';
  sqlQuery?: string = ''
  textResponse: string = ''
  loading = false
  isCached = false
  success = false

  time = new Intl
    .DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })
    .format(new Date())

  @ViewChild("input") input!: ElementRef;

  constructor(private chatService: ChatbotService) {}

  limpar(): void {
    this.success = false
    this.loading = false
    this.sqlQuery = ''
    this.textResponse = ''
    this.input.nativeElement.value = ''
    this.input.nativeElement.focus()
  }

  private highlightCode(sql: string) {
    this.highlightedCode = hljs.highlight('sql', sql).value;
  }

  async enviar(): Promise<any> {
    const input = this.input.nativeElement.value

    if (this.input.nativeElement.value !== '') {
      this.loading = true
      this.chatService.getResponseIASQL(input)
      .subscribe({
        next: response => {
          const resposta = response.body
          this.sqlQuery = format(resposta?.sql || '', {
            language: 'sql',
            tabWidth: 2,
            keywordCase: 'upper',
            linesBetweenQueries: 2,
          });
          this.textResponse = resposta?.response || ''
          this.isCached = resposta?.isCached || false
          this.success = true
          this.loading = false
          this.highlightCode(this.sqlQuery)
        },
        error: error => {
          this.loading = false
        },
      });
    }
  }

}
