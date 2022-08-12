/* eslint-disable @typescript-eslint/typedef */
//import styles from './OrderActionWebPart.module.scss';

import * as React from 'react';
import { Component } from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//import * as strings from 'SpfxPnpDynamicformWebPartStrings';
import SpfxPnpDynamicform from './components/pfxPnpDynamicform';
import SpfxPnpListview from './components/pfxPnpListview';
//import SpfxPnpDragDropFiles from './components/pfxPnpDragDropFiles';

import { ISpfxPnpDynamicformProps } from './components/ISpfxPnpDynamicformProps';
import { ISpfxPnpListviewProps } from './components/ISpfxPnpListviewProps';
//import { ISpfxPnpDragDropFilesProps } from './components/ISpfxPnpDrapDropFilesProps';



export interface IOrderActionWebPartProps {
  description: string;
}



export default class OrderActionWebPart extends
  BaseClientSideWebPart<IOrderActionWebPartProps> {

  // public async componentWillMount() {
  //   alert(123);
  //   const input = document.getElementById('attachment');

  //   input.onchange = (e) => { this.UploadFile(e); }
  // }






  public render(): void {
    const element: React.ReactElement<ISpfxPnpDynamicformProps> = React.createElement(
      SpfxPnpDynamicform,
      {
        description: this.properties.description,
        context: this.context
      }

    );

    const element2 =
      React.createElement('input',
        { type: 'file', name: 'attachment', id: 'attachment' }
      );





    const element3: React.ReactElement<ISpfxPnpListviewProps> = React.createElement(
      SpfxPnpListview,
      {
        description: this.properties.description,
        context: this.context
      }

    );



    const element4 = [element, element3]


    ReactDom.render(element4, this.domElement);



  }

  protected onInit(): Promise<void> {

    return super.onInit();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @microsoft/spfx/no-async-await




  public UploadFile(event: Event): void {
    console.log("Hasan");
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
      alert(event);
    }
  }


  // protected _onClick() {
  //   this.setState({
  //     text: 's',
  //     label: 'Thank You',
  //     disabled: true
  //   });
  // }





  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }





  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }




  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Desc"//strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "G Name",//strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Title', {
                  label: "label"//strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }


}
