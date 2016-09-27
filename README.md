# angular-2-webpack-library

This repo is a seed for building an Angular 2 library with Webpack. Supports Angular 2.0.0, Webpack 2, and Typescript 2.

### Build & Deploy Library
`npm install`

`npm run build`

`npm version major`

`npm publish`

Remember to update package.json and webpack.config.js with the name of your library.

### Install Library into Consumer

`npm install angular-2-webpack-library --save`

Replace "angular-2-webpack-library" with the name you gave the library on npm.

### Webpack

Using webpack for bundling the library gives us all of the configuration and ease-of-use that webpack provides (no task runners!) Some important features the library uses webpack for:

* components can have separate files for templates and styles
* styles can be preprocessed (LESS/SASS) via webpack loaders
* additional assets are exported (images, SASS files)

Here is a sample component exported from the library:

```javascript
// ./src/components/sample.component.ts
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
```

And here is how to consume it:

```javascript
import { Angular2Module, SampleComponent } from 'angular-2-webpack-library';

@NgModule({
  imports: [
    Angular2Module
  ]
})
```

Sample Component is now usable in the consumer using `<sample-component></sample-component>`.

This setup is awesome, and is ready to serve as the foundation for Angular 2 libraries!

---

 * Thanks [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) for config 