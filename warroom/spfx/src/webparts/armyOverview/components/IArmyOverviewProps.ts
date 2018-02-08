import { DisplayMode } from '@microsoft/sp-core-library';
export interface IArmyOverviewProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
