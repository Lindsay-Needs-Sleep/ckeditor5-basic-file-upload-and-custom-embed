import FIELD_TYPES from './field-types.js';

export default [
    {
        name: 'Image',

        produceHtml: function (data) {
        },
        inputFields: [
            {
                ...FIELD_TYPES.FILE_IMAGE,
                key: 'image',
                label: 'Image',
                type_options: {
                },
                /**
                 * Called on submit.
                 * Return a string if there is a validation error.
                 * @param {HTMLElement} fieldEl
                 * @param {HTMLElement} formEl
                 * @returns {string} - true for success, a string for the validation error message.
                 */
                validate: async function (fieldEl, formEl) {
                    console.log('validate', fieldEl, formEl);
                    // function sleep (ms) {
                    //     return new Promise(resolve => setTimeout(resolve, ms));
                    // }
                    // await sleep(3000);
                    // return 'This is an error message.';
                    return true;
                },
                /**
                 * Called after validation has passed.
                 * Should return a value to be used to create the resulting html for the editor.
                 * @param {HTMLElement} fieldEl
                 * @param {HTMLElement} formEl
                 * @returns {*} - The data to be used for this field for creating the html component.
                 */
                submit: async function (fieldEl, formEl) {
                    console.log('validate', fieldEl, formEl);
                    return true;
                },
            },
            {
                ...FIELD_TYPES.TEXT_INPUT,
                // key: 'alt',
                label: 'Alt Text',
                validate: async function (fieldEl, formEl) {
                    return 'This is an error message2.';
                    // return true;
                },
            },
        ],
    },
    {
        name: 'Audio',
        inputFields: [
            {
                key: 'audio',
                label: 'Audio',
                type: FIELD_TYPES.FILE_AUDIO,
            },
        ],
    },
];
