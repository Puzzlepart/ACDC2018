import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
//import * as pnp from "sp-pnp-js";
import {MessageBar, MessageBarType, Dialog, Link} from 'office-ui-fabric-react'
export interface IFooterState {
    showModal: boolean,
}
export default class Footer extends React.Component<{}, IFooterState> {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    @override
    public render(): React.ReactElement<{}> {
        let modal = this.state.showModal ? this.generateModal(): null;
        return (
            <div>
                <MessageBar messageBarType={MessageBarType.warning} isMultiline={false} onClick={() => this.onMessageBarClick()} >
                    <Link onClick={() => this.onMessageBarClick()}> House cloudborne © 2018 - Disclaimer: We take no responsibility for soldiers, money or experience lost. Please take a moment to read our data policies (click me) </Link>
                </MessageBar>
                {modal} 
            </div>
        );
    }
    private onMessageBarClick() {
        this.setState({showModal: true});
    }
    private closeModal() {
        this.setState({showModal: false});
    }
    private generateModal(){
        return (
            <Dialog isOpen={this.state.showModal} isBlocking={false} title={"House Cloudborne data policies and data security notice"} onDismiss={() => this.closeModal()}>
                <h3>What data is stored?</h3>
                <p>All provided data about your troops, all experience gained and used as well as all gold gained and used. Your name and login credentials are also stored.</p>
                <h3>Can my enemies access my data?</h3>
                <p>Certainly not! House cloudborne makes sure your troop data is safe by ensuring only the needed persons are allowed to access the war rooms.</p>
                <h3>Can I opt out of this datagathering?</h3>
                <p>Yes! But then there will be little use for this application, so your account will be terminated. Send a mail to thomas@acdc1806.onmicrosoft.com to get all data on you or get your data deleted.</p>
                <h3>How do I know my data is safe?</h3>
                <p>Microsoft provides only the best service to their customers. Please look <a href={"https://blogs.technet.microsoft.com/wbaer/2017/03/13/security-and-compliance-in-sharepoint-online-and-onedrive-for-business/"}>here</a> for more information.</p>
            </Dialog> 
        )
    }
}