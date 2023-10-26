import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Author } from '../shared/models/article';
import { ModelserviceService } from '../shared/services/modelservice.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  username: string | undefined = undefined;

  author!: Author;
  sameArticleByAuthor!: Article[];
  article!: Article;

  constructor(
    private route: ActivatedRoute, private mS: ModelserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('id');
      if (articleId !== null) {
        this.article = this.mS.getFeaturedArticleById(articleId);
        this.author = this.article.author;
        this.sameArticleByAuthor = this.mS.getFeaturedArticlesByAuthor(this.author.id);
      }
    });
    this.username = this.mS.username;
  }
  goToAdminEditAuthor(author: Author): void {
    this.mS.authorEdit = author;
    this.router.navigate(['admin']);
  }
}
