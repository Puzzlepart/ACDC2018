import * as React from 'react';
import styles from './WarRoomControl.module.scss';
import { IWarRoomControlProps } from './IWarRoomControlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  CompoundButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { GraphHttpClient, GraphHttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http';

export interface IBattleStats {
  XP: number;
  gold: number;
  level?: number;
  battlesWon?: number;
  battlesLost?: number;
}

export interface IWarRoomControlState {
  battleStats?: IBattleStats;
}



export default class WarRoomControl extends React.Component<IWarRoomControlProps, IWarRoomControlState> {
  constructor(props: IWarRoomControlProps, state: IWarRoomControlState) {
    super(props);
    this.state = {
      battleStats: {
        XP: 0,
        gold: 0,
        battlesWon: 0,
      },
    };
  }
  public async componentDidMount() {
    await this.fetchData();
  }
  public render(): React.ReactElement<IWarRoomControlProps> {
    return (
      <div className={styles.warRoomControl}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        <div className={styles.container}>
          <div className={styles.battleStats}>
            <div className={styles.metadata}>
              <div className={styles.label}><Icon iconName='Savings' />  Gold</div>
              <div className={styles.value}>{this.state.battleStats.gold}</div>
            </div>
            <div className={styles.metadata}>
              <div className={styles.label}><Icon iconName='ReadingMode' />  Experience</div>
              <div className={styles.value}>{this.state.battleStats.XP}</div>
            </div>
            <div className={styles.metadata}>
              <div className={styles.label}><Icon iconName='Trophy' />  Victories</div>
              <div className={styles.value}>{this.state.battleStats.battlesWon}</div>
            </div>
            <div className={styles.metadata}>
              <div className={styles.label}><Icon iconName='ErrorBadge' />  Defeats</div>
              <div className={styles.value}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  private async fetchData() {
    try {
      let graphResponse = await this.props.context.graphHttpClient.get(`v1.0/groups/${this.props.context.pageContext.legacyPageContext.groupId}?$select=id,title,techmikael_GenericSchema`, GraphHttpClient.configurations.v1);
      let response = await graphResponse.json();
      this.setState({
        battleStats: {
          XP: response.techmikael_GenericSchema["ValueString05"],
          gold: response.techmikael_GenericSchema["ValueString06"],
          battlesWon: response.techmikael_GenericSchema["ValueString07"],
        }
      });
    } catch (error) {
      throw error;
    }

  }
}
