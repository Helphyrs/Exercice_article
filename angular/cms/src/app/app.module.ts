import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleDescriptionComponent } from './article/article-description/article-description.component';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { InitialisateurService } from './shared/services/initialisateur.service';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CreateComponent } from './auth/create/create.component';

export function initializeApp(initS: InitialisateurService) {
  return (): Promise<any> => {
    return initS.initializeApp();
  };
}



@NgModule({
  declarations: [
    AppComponent,
    ArticleDescriptionComponent,
    HomeComponent,
    AuthorComponent,
    AdminComponent,
    SigninComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [InitialisateurService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitialisateurService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
