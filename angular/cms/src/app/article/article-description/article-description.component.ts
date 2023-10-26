import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article';
import { ModelserviceService } from 'src/app/shared/services/modelservice.service';

@Component({
  selector: 'app-article-description',
  templateUrl: './article-description.component.html',
  styleUrls: ['./article-description.component.scss']
})
export class ArticleDescriptionComponent implements OnInit {

  username: string | undefined = undefined;
  article!: Article;
  recommandedArticle: Article[] = [];

  constructor(
    private route: ActivatedRoute, private mS: ModelserviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('id');
      if (articleId !== null) {
        this.article = this.mS.getFeaturedArticleById(articleId);
        this.recommandedArticle = this.mS.getRecommandedArticle(articleId, this.article.keywords);
      }
    });
    this.username = this.mS.username;
  }
  goToAdminEditArticle(article: Article) {
    this.mS.articleEdit = article;
    this.router.navigate(['admin']);
  }

}

