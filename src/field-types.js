/**
 * Some pre-defined field types.
 * Can use them in in field type definitions, or mimic them to create your own.
 */

/**
 * Field types may have thier own specific required values.  See REaDME.md for details.
 * To create a custom type these are the always required attributes
 *
 * key {string} - The key to be used in the data object.
 *
 * createfieldEl {function ()}
 * @returns {HTMLElement} - The html element to be used as the input in the form.
 * Should include any required labeling/info.
 *
 * validate {async function (fieldEl)}
 * (optional) If defined, should check the field for validation errors.
 * @param {HTMLElement} fieldEl - The element created by createfieldEl.
 * @returns {true|string} - true if validation has passed, otherwise return a
 * string decribing the validation error.
 *
 * submit {async function (fieldEl)}
 * Called after validation has passed.
 * Should return a value to be used to create the resulting html for the editor.
 * @param {HTMLElement} fieldEl - The element created by createfieldEl.
 * @returns {*} - The data to be used for this field for creating the html component.
 */

import { htmlToElement } from './utils.js';

const TEXT_INPUT = {
    key: 'text',
    label: 'Text Input',
    createfieldEl: function () {
        return htmlToElement(`<p>
            <label for="${this.key}">${this.label}:</label>
            <input
                type="text"
                id="${this.key}"
                name="${this.key}"
            />
        </p>`);
    },
    submit: async function (fieldEl) {
        return fieldEl.querySelector('input').value;
    },
};

const NUMBER_INPUT = {
    key: 'number',
    label: 'Number Input',
    createfieldEl: function () {
        return htmlToElement(`<p>
            <label for="${this.key}">${this.label}:</label>
            <input
                type="number"
                id="${this.key}"
                name="${this.key}"
            />
        </p>`);
    },
    submit: async function (fieldEl) {
        return fieldEl.querySelector('input').value;
    },
};

const FILE_ANY = {
    key: 'file',
    label: 'Upload a file',
    accepts_file_types: [],
    createfieldEl: function () {
        const fieldEl = htmlToElement(`<p>
            <label for="${this.key}">${this.label}:</label>
            <input
                type="file"
                id="${this.key}"
                name="${this.key}"
                accept="${this.accepts_file_types.join(', ')}"}"
            />
        </p>`);
        fieldEl.querySelector('input').addEventListener('change', (e) => {
            this._fileUploaded = false;
        });
        return fieldEl;
    },
    validate: async function (fieldEl) {
        const file = fieldEl.querySelector('input').files[0];
        if (!file) throw new Error('File is required.');

        // If we have already uploaded this file. We're good.
        if (this._fileUploaded) return true;

        this._fileUrl = await this._uploadFile(file);
        // Mark that the file has been uploaded so we don't upload it again.
        this._fileUploaded = true;
    },
    submit: async function (fieldEl) {
        // We've already uploaded the file in validate, so just return the url.
        return this._fileUrl;
    },
    _uploadFile: async function (file) {
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            formData.append('file', file);

            var xhr = new XMLHttpRequest();
            xhr.file = file;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText).url);
                    } else {
                        // Request finished and failed
                        reject(new Error(`Failed to upload file. (${xhr.status}: ${xhr.statusText})`));
                    }
                }
            };

            xhr.open('post', this.upload_url, true);
            for (const [key, value] of Object.entries(this.upload_headers || {})) {
                xhr.setRequestHeader(key, value);
            }
            xhr.send(formData);
        });
    },
};

export default {
    FILE_ANY,
    FILE_IMAGE: {
        ...FILE_ANY,
        key: 'image',
        label: 'Upload an image',
        accepts_file_types: ['image/*'],
    },
    FILE_AUDIO: {
        ...FILE_ANY,
        key: 'audio',
        label: 'Upload an audio file',
        accepts_file_types: ['audio/*'],
    },
    FILE_VIDEO: {
        key: 'video',
        label: 'Upload a video file',
        ...FILE_ANY,
        accepts_file_types: ['video/*'],
    },
    TEXT_INPUT,
    NUMBER_INPUT,
};
