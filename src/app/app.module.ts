import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {CardShellComponent} from './card/card-shell.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'products',
        loadComponent: () =>
          import('./products/product-shell/product-shell.component').then(m => m.ProductShellComponent)
      },
      { path: 'card', component: CardShellComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
