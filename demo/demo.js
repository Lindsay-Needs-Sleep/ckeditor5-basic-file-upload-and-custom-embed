import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting.js';


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
            HtmlEmbed,
            SourceEditing,
            FileUploadAndCustomEmbed,
        ],
        toolbar: [
            'heading', 'bold', 'numberedList', 'bulletedList',
            '|', 'htmlEmbed', 'sourceEditing', '|',
            'addCustomWidget',
        ],
        basicFileUploadAndCustomEmbed: basicFileUploadAndCustomEmbedConfig,
    })
    .then(editor => {
        console.log( 'Editor was initialized', editor );
    });
