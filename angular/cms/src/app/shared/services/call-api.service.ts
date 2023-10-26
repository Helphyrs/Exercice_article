import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article, Author } from '../models/article';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  private apiUrlSelected: string = 'http://localhost:3000/api/select';
  private apiUrlEditArticle: string = 'http://localhost:3000/api/editArticle';
  private apiUrlEditAuthor: string = 'http://localhost:3000/api/editAuthor';
  private apiUrlLogOut: string = "http://localhost:3000/api/logout";

  constructor(private http: HttpClient) { }

  changeSelectedFeaturedOne(id: string): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrlSelected}/${id}`, {});
  }
  editArticle(articleEdit: Article): Observable<Article> {
    let encodedImage = encodeURIComponent(articleEdit.imageUrl);
    let url = `${this.apiUrlEditArticle}/${articleEdit.id}/${encodedImage}/${articleEdit.title}/${articleEdit.summary}/${articleEdit.content}/${articleEdit.keywords}/${articleEdit.author.id}/${articleEdit.author.bio}/${articleEdit.author.name}`;
    return this.http.put<Article>(url, {});
  }
  editAuthor(author: Author): Observable<Author> {
    let encodedName = encodeURIComponent(author.name), encodedBio = encodeURIComponent(author.bio);
    let url = `${this.apiUrlEditAuthor}/${author.id}/${encodedName}/${encodedBio}`;
    return this.http.put<any>(url, {});
  }
  logout(): Observable<any> {
    return this.http.get<any>(this.apiUrlLogOut);
  }

}
