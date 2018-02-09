import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Log } from '@microsoft/sp-core-library';

export class ProfileHelper {
    public static async getPerson(filterText: string, personTitle: string, context: IWebPartContext): Promise<IPersonaProps> {
        let results = await this.getPersons(filterText, personTitle, context);
        if (results.length > 0) return results[0];

        let noPhoto: IPersonaProps = {
            primaryText: filterText,
            secondaryText: personTitle
        };
        return noPhoto;
    }

    public static async getPersons(filterText: string, personTitle: string, context: IWebPartContext): Promise<IPersonaProps[]> {
        let results: IPersonaProps[] = [];
        try {
            let url = `${context.pageContext.site.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser`;
            var query = { 'queryParams': { 'QueryString': filterText, 'MaximumEntitySuggestions': 1, 'AllowEmailAddresses': false, 'PrincipalType': 1, 'PrincipalSource': 15, 'SharePointGroupID': 0 } };

            let response: SPHttpClientResponse = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, { body: JSON.stringify(query) });
            let suggestions = await response.json();
            let people: any[] = JSON.parse(suggestions.value);

            for (var i = 0; i < people.length; i++) {
                var p = people[i];
                let s: IPersonaProps = {};
                let account = p.Key.substr(p.Key.lastIndexOf('|') + 1);
                s.primaryText = p.DisplayText;
                s.secondaryText = personTitle;
                if (p.EntityData && p.EntityData.Email) {
                    s.tertiaryText = p.EntityData.Email;
                }
                s.imageUrl = `/_layouts/15/userphoto.aspx?size=S&accountname=${account}`;
                s.imageShouldFadeIn = true;
                s.imageInitials = "";
                s.id = account;
                results.push(s);
            }
        } catch (error) {
            Log.error("Group Metadata", error);
        }
        return results;
    }
}