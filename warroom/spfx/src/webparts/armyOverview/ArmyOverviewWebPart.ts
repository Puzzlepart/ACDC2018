import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import pnp from "sp-pnp-js";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ArmyOverviewWebPartStrings';
import ArmyOverview from './components/ArmyOverview';
import { IArmyOverviewProps } from './components/IArmyOverviewProps';

export interface IArmyOverviewWebPartProps {
  description: string;
}

export default class ArmyOverviewWebPart extends BaseClientSideWebPart<IArmyOverviewWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IArmyOverviewProps> = React.createElement(
      ArmyOverview,
      {
        description: this.properties.description
      }
    );

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
