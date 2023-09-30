import FIELD_TYPES from '../src/field-types.js';

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
                upload_headers: {
                },
            },
            // {
            //     ...FIELD_TYPES.TEXT_INPUT,
            //     key: 'caption',
            //     label: 'Image Caption',
            //     validate: async function (fieldEl, formEl) {
            //         const caption = fieldEl.querySelector('input').value;
            //         if (caption.length <= 0) return 'Caption is required.';
            //         if (caption.length > 100) return 'Caption must be less than 100 characters.';
            //         return true;
            //     },
            // },
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
