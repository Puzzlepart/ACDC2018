import * as React from 'react';
import styles from './BattleCommands.module.scss';
import { IBattleCommandsProps } from './IBattleCommandsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton } from 'office-ui-fabric-react';

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
          >
            Go to war!
            </CompoundButton>
        </div>
      </div>
    );
  }
}
