import * as React from 'react';
import styles from './WarRoomControl.module.scss';
import { IWarRoomControlProps } from './IWarRoomControlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  CompoundButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';

export default class WarRoomControl extends React.Component<IWarRoomControlProps, {}> {
  public render(): React.ReactElement<IWarRoomControlProps> {
    return (
      <div className={styles.warRoomControl}>
        <div className={styles.container}>
          <div className={styles.levelDetails}>
            <h1>Experience Points</h1>
            <div className={styles.experiencePoints}>1700 XP</div>
          </div>
        </div>
      </div>
    );
  }
}
