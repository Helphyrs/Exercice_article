import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CallApiService } from '../shared/services/call-api.service';
import { ModelserviceService } from '../shared/services/modelservice.service';
import { Article, Author } from '../shared/models/article';
import { AUTHOR } from '../shared/models/articleMockup';
import { VerifyService } from '../shared/services/verify.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  articleEdit: Article | undefined = undefined;
  authorEdit: Author | undefined = undefined
  selectedArticleId: string = "";
  selectedAuthorId: string = "";

  username: string | undefined = undefined;
  index: string = "";
  indexAuthor: string = "";
  authorName: string = "";
  title: string = "";
  displayMode: string = "";
  eventHappend: boolean = false;

  articles: Article[] = [];
  authors: Author[] = [];

  constructor(
    private callAPI: CallApiService, private mS: ModelserviceService,
    private fB: FormBuilder, private vS: VerifyService
  ) { }


  profileForm = this.fB.group({
    imageUrl: ['', Validators.required],
    title: ['', Validators.required],
    content: ['', Validators.required],
    summary: ['', Validators.required],
    keywords: ['', Validators.required],
    authorId: ['', Validators.required]
  });

  profileFormAuthor = this.fB.group({
    name: ['', Validators.required],
    bio: ['', Validators.required]
  });

  ngOnInit(): void {
    this.articles = this.mS.Articles;
    this.authors = AUTHOR;
    this.username = this.mS.username;
    this.articleEdit = this.mS.articleEdit;
    this.authorEdit = this.mS.authorEdit;
    if (this.articleEdit !== undefined) {
      this.displayMode = 'modifyArticle';
      this.eventHappend = true;
      this.selectedArticleId = this.articleEdit.id;
      this.submitPatchValue(this.selectedArticleId);
    } else if (this.authorEdit !== undefined) {
      this.displayMode = 'modifyBioAuthor';
      this.eventHappend = true;
      this.selectedAuthorId = this.authorEdit.id;
      this.submitPatchValueAuthor(this.selectedAuthorId);
    } else if (this.authorEdit === undefined) {
      this.selectedAuthorId = this.mS.getAuthorByName(this.username!).id
      this.submitPatchValueAuthor(this.selectedAuthorId);
    }
  }
  handleEvent(element: string): void {
    switch (element) {
      case "selected":
        this.displayMode = element;
        this.eventHappend = true;
        break;
      case "modifyArticle":
        this.displayMode = element;
        this.eventHappend = true;
        break;
      case "modifyBioAuthor":
        this.displayMode = element;
        this.eventHappend = true;
        break;
    }
  }
  admin(): void {
    this.eventHappend = false, this.displayMode = "", this.selectedArticleId = "", this.selectedAuthorId = "", this.authorName = "", this.title = "";
    this.profileForm.reset(), this.profileFormAuthor.reset();
  }
  selectedArticleFeatured(id: string): void {
    this.callAPI.changeSelectedFeaturedOne(id).subscribe({});
    this.mS.getDataFeaturedOne().subscribe(data => {
      this.mS.featuredArticle = this.mS.getFeaturedArticleById(data[0].featured_articleId);
      this.mS.featuredArticleId = data[0].featured_articleId;
      this.mS.articleUnfeatured = this.mS.getUnfeaturedArticles();
    })
  }
  submitPatchValue(eventOrId: any): void {
    let id;
    typeof eventOrId === "string" ? id = eventOrId : id = eventOrId.value;

    let article = this.mS.getFeaturedArticleById(id);
    let newKeyWords = article.keywords.join(',')

    this.profileForm.patchValue({
      imageUrl: article.imageUrl,
      title: article.title,
      content: article.content,
      summary: article.summary,
      keywords: newKeyWords,
      authorId: article.author.id
    })

    this.index = article.id;
    this.title = article.title;
  }

  submitPatchValueAuthor(eventOrId: any): void {
    let id;
    typeof eventOrId === 'string' ? id = eventOrId : id = eventOrId.value;

    let author = this.mS.getAuthorById(id);

    this.profileFormAuthor.patchValue({
      name: author.name,
      bio: author.bio
    })

    this.indexAuthor = author.id;
    this.authorName = author.name;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      if (formData.authorId && formData.imageUrl && formData.title && formData.content && formData.summary && formData.keywords) {

        let dataKeywords = formData.keywords.split(',');

        let dataImage = this.vS.verifyString(formData.imageUrl);
        let dataTitle = this.vS.verifyString(formData.title);
        let dataContent = this.vS.verifyString(formData.content);
        let dataSummary = this.vS.verifyString(formData.summary);
        dataKeywords = this.vS.verifyArrayOfStrings(dataKeywords);
        let dataAuthor = this.mS.getAuthorById(formData.authorId);

        const articleEdit: Article = {
          id: this.index,
          imageUrl: dataImage,
          title: dataTitle,
          summary: dataSummary,
          content: dataContent,
          author: {
            id: dataAuthor.id,
            name: dataAuthor.name,
            bio: dataAuthor.bio
          },
          keywords: dataKeywords
        };

        this.callAPI.editArticle(articleEdit).subscribe({});
        this.profileForm.reset();

      }
    } else {
      alert("tout les champs n'ont pas été remplis.");
    }
  }

  onSubmit2(): void {
    if (this.profileFormAuthor.valid) {
      const formData = this.profileFormAuthor.value;
      if (formData.bio && formData.name) {

        let dataBio = this.vS.verifyString(formData.bio);
        let dataName = this.vS.verifyString(formData.name);

        const author: Author = {
          id: this.indexAuthor,
          name: dataName,
          bio: dataBio
        };

        this.callAPI.editAuthor(author).subscribe({});
        this.profileFormAuthor.reset();

      }
    } else {
      alert("tout les champs n'ont pas été remplis");
    }
  }
}
