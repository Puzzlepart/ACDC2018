import * as React from 'react';
import styles from './BattlePortfolio.module.scss';
import { IBattlePortfolioProps } from './IBattlePortfolioProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { GraphHttpClient, GraphHttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";


export interface IBattleRoomProperties {
  XP: number;
  gold: number;
  level?: number;
  battlesWon?: number;
  battlesLost?: number;
}

export interface IBattlePortfolioState {
  groups?: Array<any>;
  isLoading?: boolean;
}

export default class BattlePortfolio extends React.Component<IBattlePortfolioProps, IBattlePortfolioState> {
  constructor(props: IBattlePortfolioProps, state: BattlePortfolio) {
    super(props);
    this.state = {
      groups: [],
      isLoading: true,
    };
  }
  public componentDidMount(): void {
    this.fetchData();
  }
  public render(): React.ReactElement<IBattlePortfolioProps> {
    let unitElements = this.state.groups.map((group) => {
      return (
        <div className={styles.container}>
          <div className={styles.unit}>
            <div className={styles.details}>{group.displayName}</div>
          </div>
        </div>
      );
    });
    return (
      <div className={styles.battlePortfolio}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        {unitElements}
      </div>
    );
  }
  private async fetchData(): Promise<void> {
    try {
      let graphResponse = await this.props.context.graphHttpClient.get(`v1.0/groups/${this.props.context.pageContext.legacyPageContext.groupId}?$select=id,title,techmikael_GenericSchema`, GraphHttpClient.configurations.v1);
      let response = await graphResponse.json();
      // let newXP = +response.techmikael_GenericSchema["ValueString05"] + 500;
      // let newGold = +response.techmikael_GenericSchema["ValueString06"] + 250;
      // let battlesWon = +response.techmikael_GenericSchema["ValueString07"] + 1;
      this.setState({
        groups: response,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }

  }
}
