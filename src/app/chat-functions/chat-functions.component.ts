import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

const FUNCIONARIO = {"codsituacao":"A","elegprodcx":"F","optcft":"N","ferias_marcada":"NÃO","curso_si_psi":"0","optjtr":"N","registra_ponto":"SIM","optcfm":"S","email":"matheussouza@bfmail.com.br","ferias_marcada_status":"NÃO","nome_mae":"Adriana","plano_odonto":"Vuon Odonto - Rede Exato (custo mensal por pessoa R$ 9,68)","codcoligada":"19","fim_periodo_aquisitivo":"2024-03-12T00:00:00","emailpessoal":"MATHEUS.SANTOS.SOUZA2020@OUTLOOK.COM","regional":"AGP","inicio_periodo_aquisitivo":"2023-03-13T00:00:00","dataadmissao":"13/03/2023","tipo_func":"N","codfilial":"020","curso_si_lgpd":"1","docusign_doc_pendentes":"0","telefone2":"67992924266","rg":"2370646","dtnascimento":"17/03/2000","funcao":"Analista Chatbot Junior","optante_pae":"S","chapa":"02000592","nome":"Matheus Santos De Souza","codagenciapagto":"00007","cad_cor_raca":"2","contintbloq":"0","elegprodutividade":"NÃO","adiantamento":"Sim","data_limite_aso":"01/01/2999","func_gg":"Não","optalm":"S","seguro_vida":"Morte Natural (cobertura R$ 44.978,68) - custo mensal R$ 11,97","termo_si_psi":"0","plano_saude":"UNIMED MS - ENFERMARIA","apelido":"Matheus","prifuncao":"Analista Chatbot Junior","transporte":"Não","emprestimo":"Não","cor_raca_atualizou":"1","pensao":"Não","rua":"Goiatuba","telefone":"67992924266","inicioultferias":"0","termo_si_lgpd":"0","contapagamento":"53905","uf_rg":"MS","naturalidade":"Campo Grande","codsecao":"1.020.2.07.06","bandeira":"Grupo Pereira","ti":"1","atestado":"Sim","numero":"00368","cpf":"07677281141","codpessoa":"234111"}

@Component({
  selector: 'app-chat-functions',
  templateUrl: './chat-functions.component.html',
  styleUrls: ['./chat-functions.component.scss']
})
export class ChatFunctionsComponent {
  loading = false

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
      this.loading = true
      this.messages.push({
        role: "user",
        content: this.input.nativeElement.value
      })

      this.input.nativeElement.value = ''

      this.chatService.getResponseFunctions({ messages: this.messages, funcionario: FUNCIONARIO })
        .subscribe({
          next: response => {
            this.messages = response.body.resposta
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
