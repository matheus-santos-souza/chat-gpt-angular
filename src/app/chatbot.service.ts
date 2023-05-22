import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) {}

  getResponse(messages: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      BASE_API_URL + '/perguntar',
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
