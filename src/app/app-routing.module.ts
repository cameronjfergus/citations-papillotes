import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ListCitesComponent} from './components/list-cites/list-cites.component';
import {PageNotFoundComponent} from './components/pageNotFound/page-not-found.component';
import {ListAuthorsComponent} from './components/list-authors/list-authors.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'cites', component: ListCitesComponent, },
  { path: 'authors', component: ListAuthorsComponent, },
  { path: 'search', component: ListCitesComponent, },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
