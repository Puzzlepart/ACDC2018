import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import {
    autobind,
    PrimaryButton,
    Button,
    DialogFooter,
    DialogContent
} from 'office-ui-fabric-react';
import styles from './LevelUpDialog.module.scss';

import pnp from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';

import { MSGraph, IGroupData, MetadataHelp, IGraphMetadata, DataType } from '../../../services';

import { GraphHttpClient, GraphHttpClientResponse, HttpClient, IHttpClientOptions } from '@microsoft/sp-http';

interface ILevelUpDialogContentState {
    isLoading: boolean;
    enoughXp: boolean;
}

interface ILevelUpDialogContentProps {
    message: string;
    close: () => void;
    submit: () => void;
    units?: any;
    context: WebPartContext;
}

class LevelUpDialogContent extends React.Component<ILevelUpDialogContentProps, ILevelUpDialogContentState> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            enoughXp: false
        };
    }
    public componentDidMount() {
        this.updateSelectedItems();

    }
    public render(): JSX.Element {
        let unitsUpdated = this.props.units.map((unit) => {
            return <div className={styles.metadata}>
                <div className={styles.label}>{unit.getValueByName('UnitType')}</div>
                <div className={styles.value}>{unit.getValueByName('UnitLevel')} => {+unit.getValueByName('UnitLevel') + 1}</div>
            </div>
        });
        return <DialogContent
            title={(this.state.isLoading) ? "Leveling up" : "Your units gain strength!"}
            subText={this.props.message}
            onDismiss={this.props.close}
            showCloseButton={false}
            className={styles.levelUpDialog}>
            {(!this.state.isLoading) ?
                <div className={styles.container}>
                    {(this.state.enoughXp) ?
                        <div className={styles.body}>
                            <div className={styles.iconContainer}><img className={styles.icon} src="/sites/wr/SiteAssets/img/level-up.png" /></div>
                            {unitsUpdated}
                        </div> :
                        <div className={styles.body}>
                            <div className={styles.iconContainer}>Not enough Experience Point. Win battles to get experience points!</div>
                            {unitsUpdated}
                        </div>}

                    <DialogFooter>
                        <Button text='Nice!' title='Nice!' onClick={this.props.close} />
                    </DialogFooter></div> : <Spinner type={SpinnerType.large} />
            }
        </DialogContent>;
    }

    private async updateSelectedItems() {
        let promises = []
        let list = pnp.sp.web.lists.getByTitle("Army");
        this.props.units.map(unit => {
            let nextLevel = +unit.getValueByName('UnitLevel') + 1;
            promises.push(list.items.getById(unit.getValueByName('ID')).update({
                UnitLevel: nextLevel
            }));
        });
        let result = await this.runPromisesInSequence(promises);
        console.log(result)
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 5000);
    }


    private async runPromisesInSequence(promises: Array<Promise<any>>) {
        let results = [];
        for (let promise of promises) {
            results.push(await promise);
        }
        return results;
    }
    private async updateWarGroupProperties() {
        let graphResponse = await this.props.context.graphHttpClient.get(`v1.0/groups/${this.props.context.pageContext.legacyPageContext.groupId}?$select=id,title,techmikael_GenericSchema`, GraphHttpClient.configurations.v1);
        let response = await graphResponse.json();
        let requiredXp = this.props.units.length + 100;
        let availableXp = +response.techmikael_GenericSchema["ValueInteger00"];
        if (requiredXp < availableXp) {
            await this.updateGroupMetadata("Integer00", availableXp - requiredXp);
            this.setState({ enoughXp: true })
        };
    }

    private async updateGroupMetadata(schemaKey: string, value: any): Promise<boolean> {
        let groupId = this.props.context.pageContext.legacyPageContext.groupId;
        let graphUrl = `v1.0/groups/${groupId}`;
        let payload = `{
                    "techmikael_GenericSchema": {
                        "Value${schemaKey}": "${value}"
                    }
                    }`;
        let ok = await MSGraph.Patch(this.props.context.graphHttpClient, graphUrl, payload);
        return ok;
    }
}


export default class LevelUpDialog extends BaseDialog {
    public message: string;
    public units: any;
    public context: any;
    public render(): void {
        ReactDOM.render(<LevelUpDialogContent
            close={this.close}
            message={this.message}
            units={this.units}
            submit={this._submit}
            context={this.context}
        />, this.domElement);
        this._submit;
    }

    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: false
        };
    }

    @autobind
    private _submit(): void {
        this.close;
    }
}