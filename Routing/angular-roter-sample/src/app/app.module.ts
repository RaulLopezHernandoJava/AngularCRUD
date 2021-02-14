import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
