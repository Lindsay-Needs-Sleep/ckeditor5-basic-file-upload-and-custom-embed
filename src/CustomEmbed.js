import Plugin from '@ckeditor/ckeditor5-core/src/plugin.js';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview.js';

import getCustomHtml from './getCustomHtml.js';
import toolbarIcon from './toolbar-icon.svg?raw';

export default class FileUploadAndCustomEmbed extends Plugin {
    static get pluginName() {
        return 'FileUploadAndCustomEmbed';
    }
    init() {
        const editor = this.editor;
        const options = this.editor.config.get('customEmbedConfiguration');
        if (!options) throw new Error('"customEmbedConfiguration" must be set in ckeditor options for ckeditor5-basic-file-upload-and-custom-embed to work.');

        editor.ui.componentFactory.add('addCustomEmbed', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set({
                label: 'Add File and Custom Embed',
                tooltip: true,
                icon: toolbarIcon,
            });

            //Execute a callback function when the button is clicked
            button.on('execute', async () => {
                /* Displays a popup to get user provided parameters and build
                some custom html. */
                const html = await getCustomHtml(options);
                if (!html) return; // User canceled the popup

                // Quick and dirty, let's spoof the html embed plugin so we
                // can use its editing capabilities.
                if (!editor.commands.get('htmlEmbed')) {
                    console.error('"@ckeditor/ckeditor5-html-embed" plugin must be installed and loaded into your ckeditor config for ckeditor5-basic-file-upload-and-custom-embed to insert the resulting html.');
                    return;
                }
                editor.execute('htmlEmbed', html);
            });

            return button;
        });
    }
}
