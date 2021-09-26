import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCe-YbLOZ2dcr2iRJwMOmm-i6FfhEAYClQ',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
