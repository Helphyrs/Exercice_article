import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleDescriptionComponent } from './article/article-description/article-description.component';
import { AuthorComponent } from './author/author.component';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CreateComponent } from './auth/create/create.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'article/:id', component: ArticleDescriptionComponent },
  { path: 'author/:id', component: AuthorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
