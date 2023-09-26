# ckeditor5-basic-file-upload-and-custom-embed
Upload a file to your own backend, and insert the resulting url (with customizable html) into your ckeditor.


## Build for isolated development

```bash
npm install
npm run build
```

You need to provide your own way to host `index.html` and `dist/`, but then visit index.html in your browser.


## Installing plugin

To prevent ckeditor core file conflicts, the plugin source should be used directly.

eg. 
```js
import { FileUploadAndCustomEmbed } from 'ckeditor5-basic-file-upload-and-custom-embed/plugin.js';
// or if you have a local clone
import { FileUploadAndCustomEmbed } from '../plugins/ckeditor5-basic-file-upload-and-custom-embed/plugin.js';
```


## VsCode Dev Container

To develop using an existing vscode dev container:

- Bottom right, `Attach to running container...`
- Open folder, eg. `/workspaces/ckeditor/plugins/ckeditor5-basic-file-upload-and-custom-embed`
