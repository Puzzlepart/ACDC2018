import * as React from 'react';
import styles from './BattleCommands.module.scss';
import { IBattleCommandsProps } from './IBattleCommandsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton } from 'office-ui-fabric-react';
import { GraphHttpClient, GraphHttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import pnp from "sp-pnp-js";

export default class BattleCommands extends React.Component<IBattleCommandsProps, {}> {
  public render(): React.ReactElement<IBattleCommandsProps> {
    return (
      <div className={styles.battleCommands}>
        <div className={styles.container}>
          <CompoundButton
            primary={true}
            description='Assemble your army and go to war againt thy enemy.'
            disabled={false}
            checked={false}
            onClick={() => {
              this.setProperties()
            }}
          >
            Go to war!
            </CompoundButton>
        </div>
      </div>
    );
  }
  private async setProperties() {
    try {
      let item = await pnp.sp.web.lists.getByTitle("Properties").items.getById(1).update({
        Title: "what"
      });
      console.log(item);

    } catch (error) {
      throw error;
    }

  }
}
