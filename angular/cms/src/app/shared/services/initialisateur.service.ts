import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ModelserviceService } from './modelservice.service';

@Injectable({
  providedIn: 'root'
})
export class InitialisateurService {
  loading = false;

  constructor(private mS: ModelserviceService) { }

  async initializeApp(): Promise<any> {

    this.mS.getAllData().subscribe(data => {
      this.mS.Articles = data.articles;
      this.mS.featuredArticleId = data.featuredID[0].featured_articleId;
      this.mS.username = data?.user;
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        firstValueFrom(this.mS.getAllData()).then(() => {
          resolve(null);
        }).catch(error => {
          console.error("Une erreur s'est produite lors de l'initialisation", error);
          reject(error);
        });
      }, 1000);
    });

  }
}
