/**
 * Some pre-defined field types.
 * Can use them in in field type definitions, or mimic them to create your own.
 *
 * To create a custom type these are the required attributes:
 *
 * createfieldEl {function (id, name, options)}
 * @param {string} id - The id to use for the input element.
 * (A lable will be created and tied to this id "<label for="id">")
 * Returns an html element to be used as the input field in the form.
 *
 * submit {async function (fieldEl, formEl)}
 * Called after validation has passed.
 * Should return a value to be used to create the resulting html for the editor.
 * @param {HTMLElement} fieldEl - The inputl element created by createfieldEl.
 * @param {HTMLElement} formEl - the entire form element incase the result depends on other fields.
 * @param {object} fieldDefinition - The full field definition incase some
 * extra values/options are needed.
 * @returns {*} - The data to be used for this field for creating the html component.
 */

import { htmlToElement } from './utils.js';

const TEXT_INPUT = {
    name: 'caption',
    label: 'Text Input',
    createfieldEl: function () {
        const id = `${this.name}-${Math.random().toString(36).substr(2, 9)}`;
        return htmlToElement(`<p>
            <label for="${id}">${this.label}:</label>
            <input
                type="text"
                id="${id}"
                name="${this.name}"
            />
        </p>`);
    },
    validate: async function (fieldEl, formEl) {
        return true;
    },
    submit: async function (fieldEl, formEl) {
        return fieldEl.value;
    },
};

const FILE_ANY = {
    accepts_file_types: [],
    createfieldEl: function (id, name, fieldDefinition) {
        const input = htmlToElement(`<input
            type="file"
            id="${id}"
            name="${name}"
            accept="${this.accepts_file_types.join(', ')}"}"
        />`);
        return input;
    },
    submit: async function (fieldEl, formEl, fieldDefinition) {
        // input.addEventListener('change', async function onSomething (e) {
        //     let file = input.files[0];

        //     var formData = new FormData();
        //     formData.append('media', file);

        //     var xhr = new XMLHttpRequest();
        //     xhr.file = file; // not necessary if you create scopes like this
        //     xhr.addEventListener('progress', function(e) {
        //         var done = e.position || e.loaded, total = e.totalSize || e.total;
        //         console.log('xhr progress: ' + (Math.floor(done/total*1000)/10) + '%');
        //     }, false);
        //     if ( xhr.upload ) {
        //         xhr.upload.onprogress = function(e) {
        //             var done = e.position || e.loaded, total = e.totalSize || e.total;
        //             console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
        //         };
        //     }
        //     xhr.onreadystatechange = function(e) {
        //         if ( 4 == this.readyState ) {
        //             console.log(['xhr upload complete', e]);
        //         }
        //     };

        //     xhr.open('post', '/upload_ckeditor_media', true);
        //     const csrftoken = await window.cookieStore.get('csrftoken');
        //     xhr.setRequestHeader('X-CSRFToken', csrftoken.value);
        //     xhr.send(formData);

        // });
    },
};

export default {
    FILE_ANY,
    FILE_IMAGE: {
        ...FILE_ANY,
        accepts_file_types: ['image/*'],
    },
    FILE_AUDIO: {
        ...FILE_ANY,
        accepts_file_types: ['audio/*'],
    },
    FILE_VIDEO: {
        ...FILE_ANY,
        accepts_file_types: ['video/*'],
    },
    TEXT_INPUT,
};
