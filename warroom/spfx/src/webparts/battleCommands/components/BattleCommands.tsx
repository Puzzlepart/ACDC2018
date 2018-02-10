import * as React from 'react';
import styles from './BattleCommands.module.scss';
import { IBattleCommandsProps } from './IBattleCommandsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton } from 'office-ui-fabric-react';
import { GraphHttpClient, GraphHttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import {
  ProgressIndicator
} from 'office-ui-fabric-react/lib/ProgressIndicator';
import { MSGraph, IGroupData, MetadataHelp, IGraphMetadata, DataType } from '../../../services';
import pnp from "sp-pnp-js";


export interface IBattleCommandsState {
  isHiddenWarDialog?: boolean;
  dialogImage?: string;
  dialogDetails?: string;
  battlePercentComplete?: number;
}

export interface IBattleRoomProperties {
  XP: number;
  gold: number;
  level?: number;
  battlesWon?: number;
  battlesLost?: number;
}

export default class BattleCommands extends React.Component<IBattleCommandsProps, IBattleCommandsState> {
  constructor(props: IBattleCommandsProps, state: IBattleCommandsState) {
    super(props);
    this.state = {
      isHiddenWarDialog: true,
      dialogImage: "",
      dialogDetails: "",

    };
  }
  public async componentDidMount() {
    await this.updateGroupMetadata("String08", "BattleRoom");
  }

  public render(): React.ReactElement<IBattleCommandsProps> {
    console.log(this.state.isHiddenWarDialog);
    let warDialog: JSX.Element = <Dialog
      hidden={this.state.isHiddenWarDialog}
      onDismiss={() => window.location.href = window.location.href}
      dialogContentProps={{
        type: DialogType.normal,
        title: "Battle Report"
      }}>
      <img width="250" src={this.state.dialogImage} />
      <ProgressIndicator
        label={this.state.dialogDetails}
        percentComplete={this.state.battlePercentComplete}
      />
    </Dialog>
    return (
      <div className={styles.battleCommands}>
        <div className={styles.container}>
          {warDialog}
          <CompoundButton
            primary={true}
            description='Assemble your army and head to war.'
            disabled={false}
            checked={false}
            onClick={() => {
              this.goToWar()
            }}
          >
            Go to war!
            </CompoundButton>
        </div>
      </div>
    );
  }

  private async goToWar() {
    await this.updateWarGroupProperties();
    this.setState({
      isHiddenWarDialog: false,
      dialogImage: "/sites/wr/SiteAssets/img/knight-going-to-war.gif",
      dialogDetails: "Your army marches to war...",
      battlePercentComplete: 0.25
    });
    setTimeout(() => {
      this.setState({
        dialogImage: "/sites/wr/SiteAssets/img/knight-attacking-enemy.gif",
        dialogDetails: "Your army is attacking the opponents town!",
        battlePercentComplete: 0.65
      })
      setTimeout(() => {
        this.setState({
          dialogImage: "/sites/wr/SiteAssets/img/trophy.png",
          dialogDetails: "Victory! You receive 500 XP & 250 Gold.",
          battlePercentComplete: 1
        });
        setTimeout(() => {
        }, 8000);
      }, 8000);
    }, 8000);
  }

  private async updateWarGroupProperties() {
    let graphResponse = await this.props.context.graphHttpClient.get(`v1.0/groups/${this.props.context.pageContext.legacyPageContext.groupId}?$select=id,title,techmikael_GenericSchema`, GraphHttpClient.configurations.v1);
    let response = await graphResponse.json();
    let newXP = +response.techmikael_GenericSchema["ValueString05"] + 500;
    let newGold = +response.techmikael_GenericSchema["ValueString06"] + 250;
    let battlesWon = +response.techmikael_GenericSchema["ValueString07"] + 1;
    console.log(battlesWon);
    await this.updateGroupMetadata("String05", newXP);
    await this.updateGroupMetadata("String06", newGold);
    await this.updateGroupMetadata("String07", battlesWon);
  }

  private async updateGroupMetadata(schemaKey: string, value: any): Promise<boolean> {
    let groupId = this.props.context.pageContext.legacyPageContext.groupId;
    let graphUrl = `v1.0/groups/${groupId}`;
    let payload = `{
                "techmikael_GenericSchema": {
                    "Value${schemaKey}": "${value}"
                }
                }`;
    let ok = await MSGraph.Patch(this.props.context.graphHttpClient, graphUrl, payload);
    return ok;
  }
}
