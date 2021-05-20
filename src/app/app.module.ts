import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCitesComponent } from './components/list-cites/list-cites.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/pageNotFound/page-not-found.component';
import { Cites } from './services/Cites';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListAuthorsComponent } from './components/list-authors/list-authors.component';
import { SearchComponent } from './components/search/search.component';
import { RandomComponent } from './components/random/random.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {Click} from './services/Click';
import {Authors} from './services/Cites/Authors';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListCitesComponent,
    ListAuthorsComponent,
    RandomComponent,
    SearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    Authors,
    Cites,
    Click,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
