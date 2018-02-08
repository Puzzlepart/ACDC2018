
import * as React from 'react';
import styles from './SquireChatControl.module.scss';
import { ISquireChatControlProps } from './ISquireChatControlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Chat } from 'botframework-webchat';
export default class SquireChatControl extends React.Component<ISquireChatControlProps, {}> {
  public render(): React.ReactElement<ISquireChatControlProps> {
    return (
      <div className={styles.squireChatControl}>
        <div className={styles.container}>
          <link href="https://cdn.botframework.com/botframework-webchat/latest/botchat.css" rel="stylesheet"></link>
          <Chat directLine={{ secret: 'UYhZ8t536jA.cwA.53w.7zezXxQeKxaJuO9IGvBkPotyMqdyxIw_PCno3Xr_r7k' }} bot={{ id: 'Podrick_Payne' }} user={{ id: 'KingInTheNorth', name: 'King in the North' }} />
        </div>
      </div>
    );
  }
}