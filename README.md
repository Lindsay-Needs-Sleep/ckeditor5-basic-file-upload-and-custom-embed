# ckeditor5-basic-file-upload-and-custom-embed
Upload a file to your own backend, and insert the resulting url (with customizable html) into your ckeditor.


## Installing plugin

To prevent ckeditor core file conflicts, the plugin source code should be used directly.

eg.
```js
import { FileUploadAndCustomEmbed } from 'ckeditor5-basic-file-upload-and-custom-embed/plugin.js';
// or if you have a local clone
import { FileUploadAndCustomEmbed } from '../plugins/ckeditor5-basic-file-upload-and-custom-embed/plugin.js';
```

NOTE: If you are using a local clone and you get a `ckeditor-duplicated-modules` you should make sure this package does not have any other ckeditor packages inside node_modules. (node_modules inside the demo is fine)


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
