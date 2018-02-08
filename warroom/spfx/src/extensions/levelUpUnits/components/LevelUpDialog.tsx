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
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";

interface ILevelUpDialogContentState {
    isLoading: boolean;
}

interface ILevelUpDialogContentProps {
    message: string;
    close: () => void;
    submit: () => void;
    defaultColor?: string;
}


class LevelUpDialogContent extends React.Component<ILevelUpDialogContentProps, ILevelUpDialogContentState> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 5000);
    }

    public render(): JSX.Element {
        return <DialogContent
            title={(this.state.isLoading) ? "Leveling up" : "Units grow in strength!"}
            subText={this.props.message}
            onDismiss={this.props.close}
            showCloseButton={false}>
            {(!this.state.isLoading) ?
                <div>
                    <div><img src="/sites/wr/SiteAssets/img/level-up.png" /> </div>
                    <DialogFooter>
                        <Button text='Nice!' title='Nice!' onClick={this.props.close} />
                    </DialogFooter></div> : <Spinner type={SpinnerType.large} />
            }
        </DialogContent>;
    }
}

export default class LevelUpDialog extends BaseDialog {
    public message: string;
    public colorCode: string;

    public render(): void {
        ReactDOM.render(<LevelUpDialogContent
            close={this.close}
            message={this.message}
            defaultColor={this.colorCode}
            submit={this._submit}
        />, this.domElement);
        this._submit
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