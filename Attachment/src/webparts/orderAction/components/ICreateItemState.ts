import { MessageBarType } from 'office-ui-fabric-react';

export interface ICreateItemState {
    title: string;
    showMessageBar: boolean;
    messageType?: MessageBarType;
    message?: string;
}