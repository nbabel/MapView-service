import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { AppRoutingModule } from './app-routing.module';
import { OtherComponent } from './components/other/other.component';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
