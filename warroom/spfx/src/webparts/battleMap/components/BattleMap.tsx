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

export default class BattleMap extends React.Component<IBattleMapProps, {}> {

  public render(): React.ReactElement<IBattleMapProps> {
    const position: L.LatLngExpression = [1400, 1200]
    const center: L.LatLngExpression = [1400, 1200]
    const mapBounds: L.LatLngBoundsExpression = [[-3000, -4242], [3000, 4242]]
    const mapUrl = "../SiteAssets/WesterosMap.png"
    return (
      <div className={styles.battleMap}>
        <div className={styles.container}>
          <div id="battlemap" className={styles.map}>
            <Map
              zoom={-1}
              minZoom={-3}
              maxZoom={2}
              crs={L.CRS.Simple}
              center={[0, 0]}>
              <ImageOverlay url={"../SiteAssets/WesterosMap.png"} bounds={mapBounds} />
            </Map>
          </div>
        </div>
      </div >
    );
  }
}

