import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WarRoomControlWebPartStrings';
import WarRoomControl from './components/WarRoomControl';
import { IWarRoomControlProps } from './components/IWarRoomControlProps';

export interface IWarRoomControlWebPartProps {
  description: string;
  title: string;
}

export default class WarRoomControlWebPart extends BaseClientSideWebPart<IWarRoomControlWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWarRoomControlProps> = React.createElement(
      WarRoomControl,
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
