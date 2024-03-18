import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  isSave = false
  loadingSave = false

  saveSql!: {
    text: string,
    query: string
  }

  isSqlVisible = false

  time = new Intl
    .DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })
    .format(new Date())

  @ViewChild("input") input!: ElementRef;

  constructor(private chatService: ChatbotService) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === ' ') {
      this.isSqlVisible = !this.isSqlVisible
      event.preventDefault();
    }
  }

  limpar(): void {
    this.resetBooleans()
    this.sqlQuery = ''
    this.textResponse = ''
    this.input.nativeElement.value = ''
    this.input.nativeElement.focus()
  }

  resetBooleans(): void {
    this.success = false
    this.loading = false
    this.isSave = false
    this.loadingSave = false
    this.isCached = false
  }

  private highlightCode(sql: string) {
    this.highlightedCode = hljs.highlight('sql', sql).value;
  }

  async enviar(): Promise<any> {
    this.resetBooleans()
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

          this.saveSql = {
            text: input,
            query: resposta?.sql || ''
          }
        },
        error: error => {
          this.success = false
          this.loading = false
        },
      });
    }
  }

  async salvar(): Promise<any> {
    this.loadingSave = true
    this.chatService.saveSqlQuery(this.saveSql)
      .subscribe({
        next: response => {
          const resposta = response.body
          this.isSave = true
          this.loadingSave = false
        },
        error: error => {
          this.isSave = false
          this.loadingSave = false
        },
      });
  }

}
