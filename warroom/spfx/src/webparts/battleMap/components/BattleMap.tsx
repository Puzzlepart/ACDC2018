import * as React from 'react';
import styles from './BattleMap.module.scss';
import { IBattleMapProps } from './IBattleMapProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton } from 'office-ui-fabric-react';
import leaflet from "leaflet";
import pnp from "sp-pnp-js";



export default class BattleMap extends React.Component<IBattleMapProps, {}> {
  public render(): React.ReactElement<IBattleMapProps> {
    return (
      <div className={styles.battleMap}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
