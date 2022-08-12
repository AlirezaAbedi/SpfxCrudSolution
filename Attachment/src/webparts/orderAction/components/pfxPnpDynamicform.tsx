import * as React from 'react';
import styles from './SpfxPnpDynamicform.module.scss';
import { ISpfxPnpDynamicformProps } from './ISpfxPnpDynamicformProps';
import { DynamicForm } from '@pnp/spfx-controls-react/lib/DynamicForm';



import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar, MessageBarType, IStackProps, Stack } from 'office-ui-fabric-react';
//import { autobind } from 'office-ui-fabric-react';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ListView } from '@pnp/spfx-controls-react';



export default class SpfxPnpDynamicform extends React.Component<ISpfxPnpDynamicformProps, {}> {



    public render(): React.ReactElement<ISpfxPnpDynamicformProps> {
        return (
            <div className={styles.spfxPnpDynamicform}>
                <DynamicForm context={this.props.context} listId={"56d40092-5189-4e16-bf23-e4ede0bebe6e"}
                    //listItemId={14}

                    onCancelled={() => { console.log('Cancelled') }}
                    onBeforeSubmit={async (listItem) => { return true; }}
                    onSubmitError={(listItem, error) => { alert(error.message); }}
                    //onSubmitted={async (listItemData) => { console.log(listItemData) }}
                    onSubmitted={(listItemData) => this.SaveOrderItems(listItemData)}

                ></DynamicForm>


            </div>
        );
    }

    protected async SaveOrderItems(param) {

        try {
            await sp.web.lists.getByTitle('Orders').items.add({
                Title: param.Title//,
                // OrderNumber: param.OrderNumber,
                // Destination: param.Destination,
                // Owner: param.Owner
            });
            this.setState({
                message: "Item: " + param.Title + " - created successfully!",
                showMessageBar: true,
                messageType: MessageBarType.success
            });
        }
        catch (error) {
            this.setState({
                message: "Item " + param.Title + " creation failed with error: " + error,
                showMessageBar: true,
                messageType: MessageBarType.error
            });
        }

        console.log(param)
        return null;
    }

}