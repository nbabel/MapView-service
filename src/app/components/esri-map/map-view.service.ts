import { Injectable, ElementRef} from '@angular/core';
import esriConfig from '@arcgis/core/config';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import LayerList from '@arcgis/core/widgets/LayerList';

@Injectable({
  providedIn: 'root'
})
export class MapViewService {
  private view: MapView = null;
  private grpLayer: GroupLayer = null;

  constructor() { }

  async initializeMap(mapDiv: ElementRef) {
    if (this.view) {
      this.view.container = mapDiv.nativeElement;
      return this.view;
    } else {
      esriConfig.portalUrl = 'https://nifc.maps.arcgis.com';

      const gacc = new FeatureLayer({
        title: 'GACC',
        url: 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/National_GACC_Current/FeatureServer/0',
        visible: true, 
      });

      const dispatch = new FeatureLayer({
        title: 'Dispatch Center Boundaries',
        url: 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/National_Dispatch_Current/FeatureServer/',
        visible: true,
      });

      const grpLayer = new GroupLayer({
        title: 'Boundaries',
        layers: [dispatch, gacc]
      });

      const map = new Map({
        basemap: 'topo',
        layers: [grpLayer]
      });

      this.view = new MapView({
        container: mapDiv.nativeElement,
        map: map,
        center: [-102, 46],
        zoom: 4,
      });

      this.view.when(view => {
        view.on('drag', event => { console.log('Drag event'); });
        view.on('mouse-wheel', event => { console.log('Mouse-wheel event'); });
      });
      // Add layer list widget
      const layerListWidget = new LayerList({
        view: this.view,
        selectionEnabled: true,
        // this will add the legend into the layer list
      });
      
      this.view.ui.add(layerListWidget, 'bottom-right');
      
      // wait for the map to load
      await this.view.when();
      return this.view;
    }
  }
}
