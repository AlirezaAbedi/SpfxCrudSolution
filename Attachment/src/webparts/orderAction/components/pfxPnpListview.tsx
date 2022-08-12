import * as React from 'react';

import * as moment from 'moment';
import styles from './SpfxPnpListview.module.scss';
import { ISpfxPnpListviewProps } from './ISpfxPnpListviewProps';
import { ISpfxPnpListviewState } from './ISpfxPnpListViewState';

import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { sp } from "@pnp/sp";
//import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

export default class SpfxPnpListview extends React.Component<ISpfxPnpListviewProps, ISpfxPnpListviewState> {

    public constructor(props: ISpfxPnpListviewProps, state: ISpfxPnpListviewState) {
        super(props);
        sp.setup({
            spfxContext: this.props.context
        });
        let _viewFields: IViewField[] = [
            {
                name: "Title",
                linkPropertyName: "ServerRelativeUrl",
                displayName: "Name",
                sorting: true,
                minWidth: 250,
            },
            {
                name: "Order Number",
                displayName: "Order Number",
                sorting: false,
                minWidth: 200,
                // render: (item: any) => {
                //     const authoremail = item['Author.UserPrincipalName'];
                //     return <a href={'mailto:' + authoremail}>{item['Author.Title']}</a>;
                // }
            },
            {
                name: "ُStatus",
                displayName: "Status",
                minWidth: 150,
                // render: (item: any) => {
                //     const created = item["TimeCreated"];
                //     if (created) {
                //         const createdDate = moment(created);
                //         return <span>{createdDate.format('DD/MM/YYYY HH:mm:ss')}</span>;
                //     }
                // }
            }
        ];
        this.state = { items: [], viewFields: _viewFields };
        this._getfiles().catch(err => console.log(err))

            ;
    }

    //@autobind
    private async _getfiles() {
        const allItems: any[] = await sp.web.lists.getByTitle("Orders").items();
        //sp.web.getFolderByServerRelativeUrl("/sites/DevPhase01/Lists/Orders/").files.select().expand("ListItemAllFields,Author").get();
        console.log(allItems);
        this.setState({ items: allItems });
    }

    public render(): React.ReactElement<ISpfxPnpListviewProps> {
        return (
            <div className={styles.spfxPnpListview}>
                <ListView
                    items={this.state.items}
                    viewFields={this.state.viewFields}
                    iconFieldName="ServerRelativeUrl"
                    compact={true}
                    selectionMode={SelectionMode.multiple}
                    selection={this._getSelection}
                    showFilter={true}
                    filterPlaceHolder="Search..." />
            </div>
        );
    }



    private _getSelection(items: any[]) {
        console.log('Selected items:', items);
    }

}