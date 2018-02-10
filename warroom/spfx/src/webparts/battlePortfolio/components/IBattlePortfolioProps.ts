import { DisplayMode } from '@microsoft/sp-core-library';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
export interface IBattlePortfolioProps {
  title: string;
  displayMode: DisplayMode;
  context: WebPartContext;
  updateProperty: (value: string) => void;
}
