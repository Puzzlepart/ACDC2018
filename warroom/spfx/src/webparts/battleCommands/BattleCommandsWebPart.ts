import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BattleCommandsWebPartStrings';
import BattleCommands from './components/BattleCommands';
import { IBattleCommandsProps } from './components/IBattleCommandsProps';

export interface IBattleCommandsWebPartProps {
  description: string;
}

export default class BattleCommandsWebPart extends BaseClientSideWebPart<IBattleCommandsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBattleCommandsProps > = React.createElement(
      BattleCommands,
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
