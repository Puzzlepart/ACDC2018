import * as React from 'react';
import styles from './BattleCommands.module.scss';
import { IBattleCommandsProps } from './IBattleCommandsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton } from 'office-ui-fabric-react';
import { GraphHttpClient, GraphHttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import pnp from "sp-pnp-js";


export interface IBattleCommandsState {
  isHiddenWarDialog?: boolean;
  dialogImage?: string;
  dialogDetails?: string;
}

export default class BattleCommands extends React.Component<IBattleCommandsProps, IBattleCommandsState> {
  constructor(props: IBattleCommandsProps, state: IBattleCommandsState) {
    super(props);
    this.state = {
      isHiddenWarDialog: true,
      dialogImage: "",
      dialogDetails: ""
    };
  }
  public render(): React.ReactElement<IBattleCommandsProps> {
    console.log(this.state.isHiddenWarDialog);
    let warDialog: JSX.Element = <Dialog
      hidden={this.state.isHiddenWarDialog}
      dialogContentProps={{
        type: DialogType.normal,
        title: "War has begun!",
        subText: this.state.dialogDetails
      }}
    >
      <img width="300" src={this.state.dialogImage} />

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
    await this.updateGroupMetadata("String00", "500");
    let graphResponse = await this.props.context.graphHttpClient.get(`v1.0/groups/${this.props.context.pageContext.legacyPageContext.groupId}?$select=id,title,techmikael_GenericSchema`, GraphHttpClient.configurations.v1);
    let items = await graphResponse.json();
    this.setState({ isHiddenWarDialog: false, dialogImage: "/sites/wr/SiteAssets/img/knight-going-to-war.gif", dialogDetails: "Your army marches to war..." })
    setTimeout(() => {
      this.setState({ dialogImage: "/sites/wr/SiteAssets/img/knight-attacking-enemy.gif", dialogDetails: "Your army is attacking the opponents base!" })
      setTimeout(() => {
        this.setState({ isHiddenWarDialog: true })
      }, 6000)
    }, 6000)
    console.log(items.techmikael_GenericSchema["ValueString00"]);
  }
  private async updateGroupMetadata(schemaKey: string, value: any): Promise<boolean> {
    let groupId = this.props.context.pageContext.legacyPageContext.groupId;
    let graphUrl = `v1.0/groups/${groupId}`;
    let payload = `{
                "techmikael_GenericSchema": {
                    "Value${schemaKey}": "${value}"
                }
                }`;
    let ok = await this.Patch(this.props.context.graphHttpClient, graphUrl, payload);
    return ok;
  }

  private async Patch(graphClient: GraphHttpClient, url: string, payload: object | string): Promise<boolean> {
    if (typeof (payload) === "object") {
      payload = JSON.stringify(payload);
    }
    let response: GraphHttpClientResponse = await graphClient.fetch(url, GraphHttpClient.configurations.v1, {
      body: payload,
      method: "PATCH"
    });
    // Check that the request was successful
    if (response.ok) {
      return true;
    }
    else {
      // Reject with the error message
      let error = new Error(response.statusText);
      throw error;
    }
  }
}
