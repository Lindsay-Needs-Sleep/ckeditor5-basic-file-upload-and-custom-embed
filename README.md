# ckeditor5-basic-file-upload-and-custom-embed
Highly customizable ckeditor5 plugin that allows you to gather/validate/transform customizable user input (including uploading files to your own backend), and inserting customizable html into your ckeditor.

This is useful for uploading files to your own backend (optional), and adding customElements / custom html (which are built from multiple user input fields).

## Example

The plugin adds a button to the toolbar that opens a dialog.

The dialog allows you to select what kind of media/widget you would like to add.

The bottom section of the popup changes to have the appropriate fields.

![preview1](./docs/preview1.png)

On "Add" the plugin inserts your custom html into the document (using the `@ckeditor/ckeditor5-html-embed` plugin).

![preview2](./docs/preview2.PNG)

You can define multiple "widgets", which have different fields, and use the user input to generate different html.

![preview3](./docs/preview3.PNG)

### Config

See [demo/demo-plugin-config.js](./demo/demo-plugin-config.js) for an example plugin config which defines the widgets, their inputs, and the html output.

There are some starter/base inputs you can use/extend here: [src/field-types.js](./src/field-types.js)

```js
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed.js';
import FileUploadAndCustomEmbed from 'ckeditor5-basic-file-upload-and-custom-embed/plugin.js';
import widgetConfig from './demo-plugin-config.js';

ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [
            HtmlEmbed,
            FileUploadAndCustomEmbed,
        ],
        toolbar: [
            'addCustomEmbed',
        ],
        customEmbedConfiguration: {...},
    })
```

## Dependencies

`@ckeditor/ckeditor5-html-embed` plugin must be installed and loaded into your ckeditor config to insert the custom html.



## Installing plugin

To prevent ckeditor core file conflicts, the plugin source code should be used directly.

eg.
```js
import FileUploadAndCustomEmbed from 'ckeditor5-basic-file-upload-and-custom-embed/plugin.js';
// or if you have a local clone
import FileUploadAndCustomEmbed from '../plugins/ckeditor5-basic-file-upload-and-custom-embed/plugin.js';
```

NOTE: If you are using a local clone and have installed `node_modules` in this project you will get a `ckeditor-duplicated-modules` unless you either delete the `node_modules` in this project or you force all `import ... '@ckeditor/...` statements to resolve to your main projects `node_modules`.  eg.

`vite.config.js`
```js
import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
        build: { ... },
        resolve: {
            alias: [
                { find: '@ckeditor', replacement: path.resolve(__dirname, 'node_modules/@ckeditor') },
            ],
        },
        plugins: [ ... ]
    };
});
```


# Development

## Build for isolated development

```bash
npm install
npm run build
```

You need to provide your own way to host `index.html` and `dist/`, but then visit index.html in your browser.


## Setup and run (demo and style checking)

### #01 - Dependencies

Install Docker (and docker compose)

[Docker Desktop](https://www.docker.com/products/docker-desktop/)
-   (windows) should use WSL2 engine

### #02 - IDE setup

**VsCode with Dev Containers (v1.74.3) (Recommended)**

This option will automaitcally include all development dependencies, extension recomendations, debug and run configs

> Install the [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)(v0.266.1)
>
> -   It should ask if you want to "Reopen in Container", say yes. (Otherwise, click on the bottom left corner (green square), `Reopen in Container (Dev Container)`)
> -   Sadly [WorkSpace Config Plus](https://marketplace.visualstudio.com/items?itemName=swellaby.workspace-config-plus) [doesn't work in devconatiners](https://github.com/swellaby/vscode-workspace-config-plus/issues/121), so you will either have to manually create `lauch.json` and `settings.json`, or outside of the devcontainer, open the folder and install the plugin.

**VsCode local & Other IDEs**

With this option you are in charge of installing and configuring all dependancies/extensions correctly

> Install Node 18.x
>
> Install extensions:
>
> -   EditorConfig (recommended) [[vscode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)]
> -   Docker (optional) [[vscode](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)]
> -   VsCode only
>     -   WorkSpace Config Plus (recommended) [[vscode](https://marketplace.visualstudio.com/items?itemName=swellaby.workspace-config-plus)]


### #03 - Setup and Run Project

```bash
# Register commit hooks
git config core.hooksPath git_hooks
```

Run initial setup script (safe to rerun, must be run from dev container)

- `./setup-dev.sh`

Fill out the following files as appropriate

-   (vscode only) `.devcontainer/user-installs.sh`
    -   Note: You should refresh the dev container **now** and any time you update `.devcontainer/user-installs.sh`
        -   `ctrl + shift + P` > `Dev Containers: Rebuild Container` for a completely fresh re-application
        -   Or re-run the file directly for a quick and dirty update `bash .devcontainer/user-installs.sh`
-   (vscode only) `.vscode/settings.local.json`

Front end developement:

-   Run `./go.sh` (see file for options)
-   You need to provide your own way to host `index.html` and `dist/`, but then visit index.html in your browser.
