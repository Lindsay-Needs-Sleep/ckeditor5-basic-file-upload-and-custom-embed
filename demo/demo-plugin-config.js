import FIELD_TYPES from '../src/field-types.js';

export default [
    {
        name: 'Image with Caption',
        buildHtml: function ({ captioned_image, caption }) {
            return `
                <img src="${captioned_image}"/>
                ${caption}
            `;
        },
        inputFields: [
            {
                ...FIELD_TYPES.FILE_IMAGE,
                key: 'captioned_image',
                label: 'Image',
                upload_url: '/my/upload_url',
                upload_headers: {
                    'X-CSRFToken': 'csrftokenvalue',
                },
                /**
                 * Overriding FIELD_TYPES.FILE_IMAGE's uploadFile method because
                 * we don't actually have a server to upload to for the demo.
                 * So just return the same demo image asset url.
                 */
                _uploadFile: async function (file) {
                    return './demo-img.jpg';
                }
            },
            {
                ...FIELD_TYPES.TEXT_INPUT,
                key: 'caption',
                label: 'Image Caption',
                validate: async function (fieldEl) {
                    const caption = fieldEl.querySelector('input').value;
                    if (caption.length <= 0) throw new Error( 'Caption is required.');
                    if (caption.length > 100) throw new Error('Caption must be less than 100 characters.');
                },
            },
        ],
    },
    {
        name: 'Audio',
        buildHtml: function (params) {
            // TODO
        },
        inputFields: [
            {
                ...FIELD_TYPES.FILE_AUDIO,
                validate: async function (fieldEl) {
                    throw new Error('This wdiget definition is an incomplete stub');
                },
            },
        ],
    },
];
