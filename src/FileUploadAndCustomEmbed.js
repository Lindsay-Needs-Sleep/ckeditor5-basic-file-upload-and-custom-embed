import Plugin from '@ckeditor/ckeditor5-core/src/plugin.js';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview.js';

import GetUserInput from './get-user-input.js';
import toolbarIcon from './toolbar-icon.svg?raw';
import CONFIG_DEMO from '../demo/demo-plugin-config.js';

export default class FileUploadAndCustomEmbed extends Plugin {
    init() {
        const editor = this.editor;
        const options = this.editor.config.get('basicFileUploadAndCustomEmbed') || CONFIG_DEMO;

        editor.ui.componentFactory.add('addfile', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set( {
                label: 'Add File and Custom Embed',
                tooltip: true,
                icon: toolbarIcon,
            } );

            //Execute a callback function when the button is clicked
            button.on('execute', async () => {
                const data = await GetUserInput(options);
                if (!data) return; // User canceled the popup

                const now = new Date();

                //Change the model using the model writer
                editor.model.change( writer => {

                    //Insert the text at the user's current position
                    editor.model.insertContent( writer.createText( now.toString() ) );
                });
            });

            return button;
        });
    }
}
// GetUserInput( CONFIG_DEMO);
