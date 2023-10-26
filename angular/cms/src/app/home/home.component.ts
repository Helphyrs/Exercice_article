import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelserviceService } from '../shared/services/modelservice.service';
import { Article } from '../shared/models/article';
import { CallApiService } from '../shared/services/call-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private mS: ModelserviceService, private callAPI: CallApiService,
    private router: Router
  ) { }

  username: string | undefined = undefined;
  article!: Article;
  unfeaturedArticle: Article[] = [];

  ngOnInit(): void {

    this.article = this.mS.getFeaturedArticleById(this.mS.featuredArticleId);
    this.unfeaturedArticle = this.mS.getUnfeaturedArticles();

    this.username = this.mS.username;

  }

  logout() {
    this.callAPI.logout().subscribe();
    this.mS.username = undefined;
    this.username = this.mS.username;
    this.router.navigate(['home']);
  }
}
