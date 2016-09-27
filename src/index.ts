import '@angular/core';
import '@angular/common';
import '@angular/compiler';
import '@angular/forms';

import {NgModule} from '@angular/core'

import {SampleComponent} from './components/sample.component';
export {SampleComponent} from './components/sample.component';

@NgModule({
  declarations: [
    SampleComponent
  ],
  exports: [
    SampleComponent
  ],
  providers: []
})
export class Angular2Module {}
