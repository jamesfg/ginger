import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Metadata } from '../models/metadata.model';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(public http: HttpClient) { }

  getTerms(page: number): Observable<Metadata[]>{
    return this.http.post<Metadata[]>(`http://localhost:3000/api/terms`, {
      page
    });
  }

  getAuthors(page: number): Observable<Author[]>{
    return this.http.post<Author[]>(`http://localhost:3000/api/authors`, {
      page
    });
  }
}
