import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sample-component',
  styles: [``],
  template: `
    <h1>Sample Component</h1>
  `
})
export class SampleComponent implements OnInit {

  public foo: string = 'foo';

  constructor() {
  }

  ngOnInit() {
    console.log('hello from SampleComponent');
  }
}
