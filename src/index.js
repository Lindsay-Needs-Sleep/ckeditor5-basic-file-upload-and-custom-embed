/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

import toolbarIcon from './toolbar-icon.svg';

export class FileUploadAndCustomEmbed extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'addfile', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set( {
                label: 'Add File',
                tooltip: true,
                icon: toolbarIcon,
            } );

            //Execute a callback function when the button is clicked
            button.on('execute', () => {
                const now = new Date();

                //Change the model using the model writer
                editor.model.change( writer => {

                    //Insert the text at the user's current position
                    editor.model.insertContent( writer.createText( now.toString() ) );
                } );
            } );

            return button;
        } );
    }
}
