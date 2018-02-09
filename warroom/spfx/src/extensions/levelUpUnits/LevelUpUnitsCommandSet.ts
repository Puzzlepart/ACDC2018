import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import LevelUpDialog from './Components/LevelUpDialog';

import * as strings from 'LevelUpUnitsCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ILevelUpUnitsCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'LevelUpUnitsCommandSet';

export default class LevelUpUnitsCommandSet extends BaseListViewCommandSet<ILevelUpUnitsCommandSetProperties> {
  private _colorCode: string;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized LevelUpUnitsCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const levelUpCommand: Command = this.tryGetCommand('LEVEL_UP');
    if (levelUpCommand) {
      levelUpCommand.visible = event.selectedRows.length >= 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    console.log(event);
    switch (event.itemId) {
      case 'LEVEL_UP':
        const dialog: LevelUpDialog = new LevelUpDialog();
        dialog.units = event.selectedRows;
        dialog.context = this.context;
        dialog.show();
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
