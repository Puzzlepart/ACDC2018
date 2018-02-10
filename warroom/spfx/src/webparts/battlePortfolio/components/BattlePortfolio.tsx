import * as React from 'react';
import styles from './BattlePortfolio.module.scss';
import { IBattlePortfolioProps } from './IBattlePortfolioProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { GraphHttpClient, GraphHttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { DocumentCard, DocumentCardPreview, DocumentCardLocation, DocumentCardTitle, DocumentCardActivity, IDocumentCardPreviewProps } from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';

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
    console.log(this.state.groups);
    let previewPropsUsingIcon: IDocumentCardPreviewProps = {
      previewImages: [
        {
          height: 128

        }
      ]
    };
    previewPropsUsingIcon.previewImages[0].previewImageSrc = "/sites/wr/SiteAssets/img/war.png";
    previewPropsUsingIcon.previewImages[0].imageFit = ImageFit.contain;
    let unitElements = this.state.groups.map((group) => {
      return (
        <DocumentCard className={styles.card} onClick={() => window.location.href = `/sites/${group.mailNickname}`} >
          <DocumentCardPreview { ...previewPropsUsingIcon } />
          <DocumentCardTitle
            title={group.displayName}
            shouldTruncate={false}
          />
          <DocumentCardLocation
            location={"Gold: " + group.techmikael_GenericSchema["ValueString05"]} />
          <DocumentCardLocation
            location={"XP: " + group.techmikael_GenericSchema["ValueString06"]} />
          <DocumentCardLocation
            location={"Vicories: " + group.techmikael_GenericSchema["ValueString07"]} />
          <DocumentCardActivity
            activity={"War Chieftains"}
            people={
              group.owners.map((owner) => {
                return { name: owner.displayName, profileImageSrc: owner.imageUrl }

              })
            }
          />
        </DocumentCard>
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
      let graphResponse = await this.props.context.graphHttpClient.get(`v1.0/groups?$select=id,displayName,mailNickname,techmikael_GenericSchema&$filter=techmikael_GenericSchema/ValueString08 eq 'BattleRoom'&$expand=owners`, GraphHttpClient.configurations.v1);
      let response = await graphResponse.json();
      this.setState({
        groups: response.value,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }

  }
}
