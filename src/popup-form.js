import popupHtml from './popup-form.html?raw';
import { htmlToElement } from './utils.js';
import CONFIG from '../demo/config.js';

export default async function ShowPopup () {

    return new Promise((resolve, reject) => {
        // Get useful elements
        const popupEl = htmlToElement(popupHtml);
        const closeEl = popupEl.querySelector('#close');
        const widgetDefinitionSelectEl = popupEl.querySelector('#widget-select');
        const fieldsetEl = popupEl.querySelector('#fieldset');

        // Populate data
        CONFIG.forEach((type, index) => {
            const optionEl = htmlToElement(`<option value="${index}">${type.name}</option>`);
            widgetDefinitionSelectEl.appendChild(optionEl);
        });
        populateForm(fieldsetEl, CONFIG[widgetDefinitionSelectEl.value]);

        // Add event listeners
        closeEl.addEventListener('click', () => {
            popupEl.remove();
            resolve(null);
        });
        widgetDefinitionSelectEl.addEventListener('change', () => {
            populateForm(fieldsetEl, CONFIG[widgetDefinitionSelectEl.value]);
        });

        // Show the popup!
        window.document.body.appendChild(popupEl);
    });
}

function populateForm(fieldsetEl, injectionDefinition) {
    // Clear the content
    fieldsetEl.innerHTML = '';

    // check the injectionDefinition is valid
    const fieldNames = {};
    injectionDefinition.inputFields.forEach((field) => {
        if (fieldNames[field.key]) throw new Error(`Duplicate "key" detected: "${field.key}".`);
        fieldNames[field.key] = true;
    });


    // Populate the new content

    // Title
    fieldsetEl.appendChild(htmlToElement(`<legend><h1 style="margin: 0;">${injectionDefinition.name}</h1></legend>`));

    // Input fields
    const fields = {};
    injectionDefinition.inputFields.forEach((field, index) => {
        // crete the field (save the result for use on validation and submit)
        fields[field.key] = field.createfieldEl();
        // add the field to the form
        fieldsetEl.appendChild(fields[field.key]);
    });

    // Submit button
    fieldsetEl.appendChild(htmlToElement(`<div style="display: flex; justify-content: right;">
    <button type="submit">+ Add</button>
    </div>`));
    const submitButtonEl = fieldsetEl.querySelector('button[type="submit"]');

    // on submit
    submitButtonEl.addEventListener('click', (e) => {
        e.preventDefault();

        // Clear previous error message elements
        fieldsetEl.querySelectorAll('.form-error').forEach((el) => el.remove());

        // Validate each field
        let formIsValid = true;
        Promise.all(injectionDefinition.inputFields.map(async (field) => {
            const fieldEl = fields[field.key];
            const validate = field.validate || (() => true);
            try {
                await validate.call(field, fieldEl, fieldsetEl);
            } catch (error) {
                // Else add an error message element
                console.log('Validation Error', error);
                fieldEl.appendChild(htmlToElement(
                    `<div
                        class="form-error"
                        style="
                            width: fit-content;
                            margin-top: 2px;
                            padding: 5px;
                            color: #e32525;
                            background-color: #fff6f6;
                            border: 1px solid #ff0303;
                            border-radius: 5px;
                        "
                    >* ${error.message}</div>`
                ));
                formIsValid = false;
            }
        })).then(() => {
            console.log('validation complete', formIsValid);
            if (!formIsValid) return;

            // If all validation passed, pass each field through it's submit handler
            // and build the result object
            const result = {};
            Promise.all(injectionDefinition.inputFields.map(async (field) => {
                result[field.key] = await field.submit(fields[field.key], fieldsetEl);
            })).then((results) => {
                console.log('submission complete', result);

            });
        });
    });
}

