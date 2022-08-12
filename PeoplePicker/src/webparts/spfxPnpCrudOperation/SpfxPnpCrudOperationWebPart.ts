import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
//import { escape } from '@microsoft/sp-lodash-subset';

//import styles from './SpfxPnpCrudOperationWebPart.module.scss';
import * as strings from 'SpfxPnpCrudOperationWebPartStrings';
import * as pnp from 'sp-pnp-js';
//import { Web, List, ItemAddResult } from "sp-pnp-js/lib/pnp";
//import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
//import { ISpfxPnpPeoplepickerProps } from './ISpfxPnpPeoplepickerProps';


//People Picker

import SpfxPnpPeoplepicker from './components/SpfxPnpPeoplepicker';
import { ISpfxPnpPeoplepickerProps } from './components/ISpfxPnpPeoplepickerProps';


export interface ISpfxPnpCrudOperationWebPartProps {
  description: string;
}

export interface ISpfxPnpPeoplepickerWebPartProps {
  description: string;
}

let fileName = "";
let fileObject;


export default class SpfxPnpCrudOperationWebPart extends BaseClientSideWebPart<ISpfxPnpCrudOperationWebPartProps> {
  [x: string]: any;

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';



  public render(): void {


    const element: React.ReactElement<ISpfxPnpPeoplepickerProps> = React.createElement(
      SpfxPnpPeoplepicker,
      {
        description: this.properties.description,
        context: this.context
      }
    );


    this.domElement.innerHTML = `
    <div>
    <input type="textbox" Id="Title" /><br />
    <input type='file' id='fileUploadInput' name='myfile'/><br />
    <input type="submit" id="btnInsert" value="Save" />
    </div>
    `;

    this.bindEvent();
  }


  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('description', {
  //                 label: strings.DescriptionFieldLabel
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }


  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private bindEvent(): void {
    this.domElement.querySelector('#btnInsert')
      .addEventListener('click', () => { this.insertOrder() })

    let fileUpload = document.getElementById("fileUploadInput")
    if (fileUpload) {
      fileUpload.addEventListener('change', () => {
        this.uploadFiles(fileUpload);
      });
    }
  }

  private uploadFiles(fileUpload): void {
    fileName = fileUpload.files[0].name;
    fileObject = fileUpload.files[0];


  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private insertOrder(): void {

    // eslint-disable-next-line @typescript-eslint/typedef
    let txtTitle = document.getElementById("Title")["value"];

    // const siteUrl: string = this.context.pageContext.site.absoluteUrl +
    //   "/_api/web/lists/getbytitle('Orders')/items";

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    pnp.sp.web.lists.getByTitle('Orders').items.add({
      Title: txtTitle
    }).then(response => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      response.item.attachmentFiles.add(fileName, fileObject);
      alert("Item has been added");
    });



    ;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
