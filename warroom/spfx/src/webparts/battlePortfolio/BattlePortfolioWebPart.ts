import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BattlePortfolioWebPartStrings';
import BattlePortfolio from './components/BattlePortfolio';
import { IBattlePortfolioProps } from './components/IBattlePortfolioProps';

export interface IBattlePortfolioWebPartProps {
  title: string;
}

export default class BattlePortfolioWebPart extends BaseClientSideWebPart<IBattlePortfolioWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBattlePortfolioProps> = React.createElement(
      BattlePortfolio,
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
