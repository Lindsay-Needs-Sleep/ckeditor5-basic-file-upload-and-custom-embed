import FIELD_TYPES from '../src/field-types.js';

export default [
    {
        name: 'Image with Caption',

        inputFields: [
            {
                ...FIELD_TYPES.FILE_IMAGE,
                key: 'image',
                label: 'Image',
                upload_headers: {
                    'X-CSRFToken': 'csrftoken',
                },
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
        inputFields: [
            {
                ...FIELD_TYPES.FILE_AUDIO,
                validate: async function (fieldEl) {
                    throw new Error('File is required!!!!');
                },
            },
        ],
    },
];
