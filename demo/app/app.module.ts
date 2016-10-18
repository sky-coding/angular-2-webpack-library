import {NgModule, ApplicationRef} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {Angular2Module} from '../../dist/src'

// App
import {App} from './app.component';

const PIPES = [];


// Application wide providers
const APP_PROVIDERS = [
  {provide: LocationStrategy, useClass: PathLocationStrategy}
];

@NgModule({
  bootstrap: [App],
  declarations: [
    App,

    ...PIPES
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Angular2Module
    // RouterModule.forRoot(ROUTES, {useHash: false}),
  ],
  providers: [
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {
  }
}

