import { DisplayMode } from '@microsoft/sp-core-library';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
export interface IWarRoomControlProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}
