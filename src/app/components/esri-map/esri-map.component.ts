import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import { MapViewService } from './map-view.service';

@Component({
  selector: 'esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit, OnDestroy {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  // The <div> where we will place the map
  @ViewChild('mapViewNode', {static: true}) private mapViewEl: ElementRef;
  private loaded = false;
  get mapLoaded(): boolean {
    return this.loaded;
  }
  private view: MapView = null;

  constructor(private mapViewService: MapViewService) { }

  

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.mapViewService.initializeMap(this.mapViewEl).then(r => {
      console.log(r);
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.container = null;
    }
  }

}
