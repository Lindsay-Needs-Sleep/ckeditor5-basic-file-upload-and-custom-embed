import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

import FileUploadAndCustomEmbed from '../plugin.js';
import basicFileUploadAndCustomEmbedConfig from './demo-plugin-config.js';


ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [
            Essentials,
            Paragraph,
            Heading,
            List,
            Bold,
            FileUploadAndCustomEmbed
        ],
        toolbar: [
            'heading', 'bold', 'numberedList', 'bulletedList',
            'addFile',
        ],
        basicFileUploadAndCustomEmbed: basicFileUploadAndCustomEmbedConfig,
    })
    .then(editor => {
        console.log( 'Editor was initialized', editor );
    });
