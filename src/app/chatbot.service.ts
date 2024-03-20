import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
const { URL_BASE_API } = environment

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
      `${URL_BASE_API}/sales/question`,
      { question },
      {
        observe: 'response',
      }
    );
  }

  saveSqlQuery(savesql: { text: string, query: string}): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${URL_BASE_API}/betina-redis/create-query-sql`,
      savesql,
      {
        observe: 'response'
      }
    );
  }
}
