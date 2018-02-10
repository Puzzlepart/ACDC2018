import * as React from 'react';
import styles from './BattleMap.module.scss';
import { IBattleMapProps } from './IBattleMapProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton } from 'office-ui-fabric-react';
import pnp from "sp-pnp-js";
import {
  ImageOverlay,
  Map,
  Marker,
  MapComponent,
  TileLayer,
  Popup,
  PopupProps,
} from "react-leaflet";
var L = require('leaflet');

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

export default class BattleMap extends React.Component<IBattleMapProps, {}> {

  public render(): React.ReactElement<IBattleMapProps> {
    const position: L.LatLngExpression = [1400, 1200]
    const center: L.LatLngExpression = [1400, 1200]
    const mapBounds: L.LatLngBoundsExpression = [[3000, 4242]]
    const mapUrl = "../SiteAssets/WesterosMap.png"
    return (
      <div className={styles.battleMap}>
        <div className={styles.container}>
          <div id="battlemap" className={styles.map}>
            <Map zoom={13} crs={L.CRS.Simple} center={center}>
              <ImageOverlay url={mapUrl} bounds={mapBounds} />
              {/* <Marker  position={position}>
                <Popup>
                  <span>A pretty CSS3 popup.<br />Easily customizable.</span>
                </Popup>
              </Marker> */}
            </Map>
          </div>
        </div>
      </div >
    );
  }

  // public componentDidMount() {
  //   //  this.loadMap();

  // }



  // public loadMap() {
  //   var map = L.map('map', {
  //     crs: L.CRS.Simple
  //   });

  //   var yx = L.latLng;

  //   var xy = function (x, y) {
  //     if (L.Util.isArray(x)) {    // When doing xy([x, y]);
  //       return yx(x[10], x[0]);
  //     }
  //     return yx(y, x);  // When doing xy(x, y);
  //   };

  //   var bounds = [xy(0, 0), xy(3000, 4242)];
  //   var image = L.imageOverlay('../SiteAssets/WesterosMap.png', bounds).addTo(map);

  //   var KingsLanding = xy(1612, 1410.0);
  //   var CrossRoadsInn = xy(1500, 1900.0);
  //   var StormsEnd = xy(1900, 1060.0);

  //   L.marker(CrossRoadsInn).addTo(map).bindPopup('Crossroads Inn');
  //   L.marker(KingsLanding).addTo(map).bindPopup('Kings Landing');
  //   L.marker(StormsEnd).addTo(map).bindPopup("Storm's End");

  //   var travel = L.polyline([KingsLanding, CrossRoadsInn]).addTo(map);
  //   var travel = L.polyline([KingsLanding, StormsEnd]).addTo(map);

  //   map.setMaxZoom(2)
  //   map.setMinZoom(-2)
  //   map.setView(xy(1620, 1450), -2)

  //   L.Control.MousePosition = L.Control.extend({
  //     options: {
  //       position: 'bottomleft',
  //       separator: ' : ',
  //       emptyString: 'Unavailable',
  //       lngFirst: false,
  //       numDigits: 5,
  //       lngFormatter: undefined,
  //       latFormatter: undefined,
  //       prefix: ""
  //     },

  //     onAdd: function (map) {
  //       this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
  //       L.DomEvent.disableClickPropagation(this._container);
  //       map.on('mousemove', this._onMouseMove, this);
  //       this._container.innerHTML = this.options.emptyString;
  //       return this._container;
  //     },

  //     onRemove: function (map) {
  //       map.off('mousemove', this._onMouseMove)
  //     },

  //     _onMouseMove: function (e) {
  //       var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
  //       var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
  //       var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
  //       var prefixAndValue = this.options.prefix + ' ' + value;
  //       this._container.innerHTML = prefixAndValue;
  //     }

  //   });

  //   L.Map.mergeOptions({
  //     positionControl: false
  //   });

  //   L.Map.addInitHook(function () {
  //     if (this.options.positionControl) {
  //       this.positionControl = new L.Control.MousePosition();
  //       this.addControl(this.positionControl);
  //     }
  //   });

  //   L.control.mousePosition = function (options) {
  //     return new L.Control.MousePosition(options);
  //   };

  //   L.control.mousePosition().addTo(map);

  // }
}

