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
import DisplayMode from '@microsoft/sp-core-library/lib/DisplayMode';

export interface IArmyOverviewWebPartProps {
  description: string;
  title: string;
}

export default class ArmyOverviewWebPart extends BaseClientSideWebPart<IArmyOverviewWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IArmyOverviewProps> = React.createElement(
      ArmyOverview,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        context: this.context
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
