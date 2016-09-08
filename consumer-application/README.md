# angular-2-webpack-library

This repo demonstrates building an Angular 2 library with Webpack, and then consuming it with another Angular 2 application also built with Webpack.

### Setup
clone & `cd` into root directory

`cd ./angular-2-webpack-library`

`npm install`

`npm run build`

`npm link`

`cd ../consumer-application`

`npm install`

`npm link angular-2-webpack-library`

`npm start`

http://localhost:3000/

### Webpack

Using webpack for bundling the library gives us all of the configuration and ease-of-use that webpack provides (no task runners!) Some important features the library uses webpack for: 

* components can have separate files for templates and styles
* styles can be preprocessed (LESS/SASS) via webpack loaders
* additional assets are exported (images, SASS files)

Here is a sample component exported from the library:

```javascript
// ./angular-2-webpack-library/src/components/sample.component.ts
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sample-component',
  styles: [``],
  template: `
    <h1>Sample Component</h1>
  `
})
export class SampleComponent implements OnInit{

  public foo:string = 'foo';

  constructor() {}

  ngOnInit() {
    console.log('hello from SampleComponent');
  }
}
```

And here it is being consumed:

```javascript
// ./consumer-application/src/app/app.module.ts
import { SampleComponent } from 'angular-2-webpack-library';

@NgModule({
  declarations: [
    SampleComponent
  ]
})
```

Sample Component is now usable in the consumer using `<sample-component></sample-component>`.

This setup is awesome, and is ready to serve as the foundation for Angular 2 libraries!

---

 * [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) used for seeding