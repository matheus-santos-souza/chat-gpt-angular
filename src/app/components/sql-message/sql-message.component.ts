import { Component, Input, OnInit } from '@angular/core';
import hljs from 'highlight.js';
import { format } from 'sql-formatter';

@Component({
  selector: 'app-sql-message',
  templateUrl: './sql-message.component.html',
  styleUrls: ['./sql-message.component.scss']
})
export class SqlMessageComponent implements OnInit {
  highlightedCode: string = '';
  @Input() sqlQuery?: string;
  @Input() titleSql: string = '';

  constructor() {}
   
  ngOnInit(): void {
    const sqlFormated = this.formatedSql(this.sqlQuery || '')
    this.highlightCode(sqlFormated)
  }

  private highlightCode(sql: string) {
    this.highlightedCode = hljs.highlight('sql', sql).value;
  }

  private formatedSql(sql: string) {
    return format(sql, {
      language: 'sql',
      tabWidth: 2,
      keywordCase: 'upper',
      linesBetweenQueries: 2,
    });
  }
}
