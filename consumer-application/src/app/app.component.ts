import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {SomeComponent, SOME_STATIC_VALUE} from 'angular-2-webpack-library';

let objectWhenRequired = require('angular-2-webpack-library');
console.log('objectWhenRequired', objectWhenRequired);

console.log('SomeComponent', SomeComponent);
console.log('SOME_STATIC_VALUE', SOME_STATIC_VALUE);


import '../style/app.scss';


@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [],
  directives: [SomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Consumer Application';

  constructor() {
  }
}
