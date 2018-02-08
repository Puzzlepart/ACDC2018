import { DisplayMode } from '@microsoft/sp-core-library';
export interface IWarRoomControlProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
