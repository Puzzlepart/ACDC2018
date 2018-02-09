import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BattleMapWebPartStrings';
import BattleMap from './components/BattleMap';
import { IBattleMapProps } from './components/IBattleMapProps';

export interface IBattleMapWebPartProps {
  description: string;
}

export default class BattleMapWebPart extends BaseClientSideWebPart<IBattleMapWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBattleMapProps > = React.createElement(
      BattleMap,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
