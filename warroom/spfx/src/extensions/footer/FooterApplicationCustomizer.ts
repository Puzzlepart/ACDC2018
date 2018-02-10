import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Footer from './Components/Footer';

import * as strings from 'FooterApplicationCustomizerStrings';

const LOG_SOURCE: string = 'FooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class FooterApplicationCustomizer
  extends BaseApplicationCustomizer<IFooterApplicationCustomizerProperties> {
    private _placeholder: PlaceholderContent;

    @override
    public onInit(): Promise<void> {
      Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
      this._placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);
      let footerPlaceHolder = document.createElement("DIV");
      this._placeholder.domElement.appendChild(footerPlaceHolder);
      if (this._placeholder) {
        ReactDOM.render(
          React.createElement(Footer, {}) 
        , footerPlaceHolder);
      }
  
      return Promise.resolve<void>();
    }
}
