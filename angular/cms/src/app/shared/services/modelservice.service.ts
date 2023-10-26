import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, Author } from '../models/article';
import { AUTHOR } from '../models/articleMockup';


@Injectable({
  providedIn: 'root'
})
export class ModelserviceService {

  username: string | undefined = undefined;
  articleEdit: Article | undefined = undefined;
  authorEdit: Author | undefined = undefined;
  featuredArticleId: string = "";

  Articles: Article[] = [];
  featuredArticle!: Article;
  articleUnfeatured: Article[] = [];

  private apiUrlAll = 'http://localhost:3000/api/all';
  private apiUrlFeaturedOne = 'http://localhost:3000/api/idFeatured';

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get<any>(this.apiUrlAll);
  }

  getDataFeaturedOne(): Observable<any> {
    return this.http.get<any>(this.apiUrlFeaturedOne);
  }

  getFeaturedArticleById(index: string): Article {
    let article = this.Articles.find(elem => elem.id === index);
    return article ? article : this.Articles[0];
  }

  getArticleByTitle(title: string): Article {
    let article = this.Articles.find(elem => elem.title === title);
    return article ? article : this.Articles[0];
  }

  getArticleByAuthorName(name: string): Article {
    let article = this.Articles.find(elem => elem.author.name === name);
    return article ? article : this.Articles[0];
  }
  getAuthorById(index: string): Author {
    let author = AUTHOR.find((author: { id: string; }) => author.id === index);
    return author ? author : AUTHOR[0];
  }

  getAuthorByName(name: string): Author {
    let author = AUTHOR.find((author: { name: string }) => author.name === name);
    return author ? author : AUTHOR[0];
  }

  getRecommandedArticle(index: string, array: string[]): Article[] {
    let arrayRecommanded: Article[] = [];
    this.Articles.forEach(article => {
      let value = 0;
      for (let tag of array) {
        if (article.id !== index) {
          let filter: boolean = article.keywords.includes(tag);
          if (filter && value === 0) {
            arrayRecommanded.push(article);
            value++;
          }
        }
      }
    })
    return arrayRecommanded;
  }

  getFeaturedArticlesByAuthor(index: string): Article[] {
    let arrayByAuthor: Article[] = [];
    this.Articles.forEach(article => {
      if (article.author.id === index) {
        arrayByAuthor.push(article);
      }
    })
    return arrayByAuthor;
  }



  getUnfeaturedArticles(): Article[] {
    let UnfeaturedArticles = this.Articles.filter(elem => elem.id !== this.featuredArticleId);
    this.articleUnfeatured = UnfeaturedArticles;
    return UnfeaturedArticles ? UnfeaturedArticles : this.Articles;
  }
}
