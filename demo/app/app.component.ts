import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <h1>Application</h1>
    <hr>
    <sample-component></sample-component>
    <!--<div class="app-content">-->
      <!--<router-outlet></router-outlet>-->
    <!--</div>-->
    `
})
export class App {

  constructor() {
  }

}
