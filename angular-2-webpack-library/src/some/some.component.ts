import {Component} from '@angular/core';

@Component({
  selector: 'some-component', // <some-component></some-component>
  providers: [],
  directives: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class SomeComponent {
  public name = 'World';

  constructor() {}
}
