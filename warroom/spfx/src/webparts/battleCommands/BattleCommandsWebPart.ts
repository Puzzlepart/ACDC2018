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
import pnp from "sp-pnp-js";

export interface IBattleCommandsWebPartProps {
  description: string;
}

export default class BattleCommandsWebPart extends BaseClientSideWebPart<IBattleCommandsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBattleCommandsProps> = React.createElement(
      BattleCommands,
      {
        context: this.context,
      }
    );
    console.log(this.context.pageContext.legacyPageContext.groupId);
    ReactDom.render(element, this.domElement);
  }
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
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
