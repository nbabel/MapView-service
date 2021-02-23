import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsriMapComponent } from '../app/components/esri-map/esri-map.component';
import { OtherComponent } from '../app/components/other/other.component';

const routes: Routes = [
  { path: 'esri-map', component: EsriMapComponent },
  { path: 'other', component: OtherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
