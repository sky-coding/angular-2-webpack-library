# angular-2-webpack-library

This repo demonstrates building an Angular 2 libray with Webpack, and then consuming it with another Angular 2 application also built with Webpack.

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

http://localhost:8080

Important features of the library itself are:

 * components have separate files for templates and styles
 * styles are preprocessed, using SASS
 * additional assets are exported (images, raw SASS files)

Here are the key files to look at:

```javascript
// ./angular-2-webpack-library/src/index.ts
export * from './some/some.component';

export let SOME_STATIC_VALUE = 'VALUE EXPORT SUCCESS';
```

```javascript
// ./angular-2-webpack-library/src/some/some.component.ts
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

```


```javascript
// ./consumer-application/src/app/app.component.ts
import {SomeComponent, SOME_STATIC_VALUE} from 'angular-2-webpack-library';

let objectWhenRequired = require('angular-2-webpack-library');
console.log('objectWhenRequired', objectWhenRequired);

console.log('SomeComponent', SomeComponent);
console.log('SOME_STATIC_VALUE', SOME_STATIC_VALUE);

@Component({
	directives: [SomeComponent],
/* ... */
```

```
> objectWhenRequired Object {SOME_STATIC_VALUE: "VALUE EXPORT SUCCESS"}
> SomeComponent SomeComponent() { this.name = 'World'; }
> SOME_STATIC_VALUE VALUE EXPORT SUCCESS
> EXCEPTION: No Directive annotation found on SomeComponent
> EXCEPTION: No Directive annotation found on SomeComponent
```

This setup is awesome, and could serve as the foundation for quality third-party libraries, but is currently suffering from an annotations problem. As you can see above, the component and other exports are available, but annotations are not making it into Angular. Suggestions or contributions are very appreciated.

Thanks!




---

 * [preboot/angular2-webpack](https://github.com/preboot/angular2-webpack) used for seeding
