import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article, Author } from '../models/article';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  private apiUrlSignIn: string = "http://localhost:3000/api/login";
  private apiUrlCreateAccount: string = "http://localhost:3000/api/signup";

  signIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlSignIn}`, data);
  }
  signUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlCreateAccount}`, data);
  }
}
