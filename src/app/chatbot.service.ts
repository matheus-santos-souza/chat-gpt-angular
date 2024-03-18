import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000'

interface ResponseIASQL {
  response: string
  sql: string
  isCached: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) {}

  getResponseIASQL(question: string): Observable<HttpResponse<ResponseIASQL>> {
    return this.http.post<ResponseIASQL>(
      'http://localhost:4000/sales/question',
      { question },
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        observe: 'response',
      }
    );
  }

  getResponseFunctions(messages: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      BASE_API_URL + '/functions',
      messages,
      {
        observe: 'response',
      }
    );
  }

  getResponse(messages: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      BASE_API_URL + '/perguntar',
      messages,
      {
        observe: 'response',
      }
    );
  }

  getResponseBanco(messages: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      BASE_API_URL + '/perguntar/banco',
      messages,
      {
        observe: 'response',
      }
    );
  }

  getIntencao(message: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      BASE_API_URL + '/intencao',
      message,
      {
        observe: 'response',
      }
    );
  }
}
