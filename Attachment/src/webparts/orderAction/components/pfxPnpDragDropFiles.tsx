import * as React from 'react';
import { ISpfxPnpDragDropFilesProps } from './ISpfxPnpDrapDropFilesProps';
//import { ISpfxPnpDragDropFilesState } from './ISpfxPnpDragDropFilesState';


import { DragDropFiles } from "@pnp/spfx-controls-react/lib/DragDropFiles";
export default class SpfxPnpDragDropFiles extends React.Component<ISpfxPnpDragDropFilesProps, {}> {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    public render(): React.ReactElement<ISpfxPnpDragDropFilesProps> {
        return (
            <DragDropFiles
                dropEffect="copy"
                enable={true}
                onDrop={this._getDropFiles}
                iconName="Upload"
                labelMessage="My custom upload File"
            >
                {/* Specify the components to load where Drag and drop area should work */}
            </DragDropFiles>
        )
    }

    private _getDropFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            console.log("Filename: " + files[i].name);
            console.log("Path: " + files[i].fullPath);
        }
    }
}