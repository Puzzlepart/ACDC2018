import * as React from 'react';
import styles from './ArmyOverview.module.scss';
import { IArmyOverviewProps } from './IArmyOverviewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";
import {
  PrimaryButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export interface IArmyOverviewState {
  units?: Array<any>;
  isLoading?: boolean;
}

export default class ArmyOverview extends React.Component<IArmyOverviewProps, IArmyOverviewState> {

  constructor(props: IArmyOverviewProps, state: IArmyOverviewState) {
    super(props);
    this.state = {
      units: [],
      isLoading: true,
    };
  }
  public componentDidMount(): void {
    this.fetchData();
  }

  public render(): React.ReactElement<IArmyOverviewProps> {
    let { isLoading, units } = this.state;
    let unitElements = this.state.units.map((unit) => {
      return (
        <div className={styles.container}>
          <div className={styles.unit}>
            <div className={styles.icon}> <img src={this.getUnitImg(unit.Title)} /></div>
            <div className={styles.details}>{unit.Units.length} x {unit.Title}</div>
          </div>
        </div>
      );
    });
    return (
      <div className={styles.armyOverview}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        {unitElements}

        <PrimaryButton
          className={styles.levelUpButton}
          data-automation-id='level-up'
          disabled={false}
          checked={false}
          onClick={() => {
            this.navigateToList()
          }}
        >
          LEVEL UP
        </PrimaryButton>
      </div>
    );
  }
  private async fetchData(): Promise<void> {
    try {
      let units = await pnp.sp.web.lists.getByTitle("Army").items.get();

      let groupedByType = units.reduce((prev, current) => {
        prev[current.UnitType] = prev[current.UnitType] || new Array();
        prev[current.UnitType].push(current);
        return prev;
      }, {});

      let groups = Object.keys(groupedByType).map((item: string) => {
        return { Title: item, Units: groupedByType[item] };
      });

      this.setState({
        units: groups,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }

  }
  private navigateToList() {
    window.location.href = `${this.props.context.pageContext.web.absoluteUrl}/lists/army`;
  }
  private getUnitImg(type: string) {
    switch (type) {
      case "Foot soldier":
        return "/sites/wr/SiteAssets/img/foot-soldier.png";
      case "Dragon":
        return "/sites/wr/SiteAssets/img/dragon.png";
    }
  }
}
