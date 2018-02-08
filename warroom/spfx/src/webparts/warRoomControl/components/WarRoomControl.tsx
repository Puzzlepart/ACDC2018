import * as React from 'react';
import styles from './WarRoomControl.module.scss';
import { IWarRoomControlProps } from './IWarRoomControlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  CompoundButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class WarRoomControl extends React.Component<IWarRoomControlProps, {}> {
  public render(): React.ReactElement<IWarRoomControlProps> {
    return (
      <div className={styles.warRoomControl}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        <div className={styles.container}>

          <div className={styles.levelDetails}>
            <div className={styles.metadata}>
              <div className={styles.label}>Experience</div>
              <div className={styles.value}>1700 XP</div>
            </div>
            <div className={styles.metadata}>
              <div className={styles.label}>Location</div>
              <div className={styles.value}>Vesteros</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
