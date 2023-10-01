import popupHtml from './popup-form.html?raw';
import { htmlToElement } from './utils.js';

/**
 * Displays a popup form based on the plugin config to gather user input and
 * build some custom html.
 * @param {object} config
 * @returns {string} - The resulting custom html.
 */
export default async function getCustomHtml (config) {
    return new Promise((resolve, reject) => {
        // Get useful elements
        const popupEl = htmlToElement(popupHtml);
        const closeEl = popupEl.querySelector('#bfuce-close');
        const widgetDefinitionSelectEl = popupEl.querySelector('select');
        const fieldsetEl = popupEl.querySelector('fieldset');
        const submitButtonEl = popupEl.querySelector('#bfuce-submit button');

        // helper fn's
        function getWidgetDefinition () {
            return config[widgetDefinitionSelectEl.value];
        }

        // Populate data
        config.forEach((type, index) => {
            const optionEl = htmlToElement(`<option value="${index}">${type.name}</option>`);
            widgetDefinitionSelectEl.appendChild(optionEl);
        });
        let fieldEls = populateForm(fieldsetEl, getWidgetDefinition());

        // Add event listeners

        // on widget type change
        widgetDefinitionSelectEl.addEventListener('change', async () => {
            fieldEls = populateForm(fieldsetEl, getWidgetDefinition());
        });
        // on close
        closeEl.addEventListener('click', () => {
            popupEl.remove();
            resolve(null);
        });
        // on submit
        submitButtonEl.addEventListener('click', (e) => {
            e.preventDefault();

            // Clear previous error message elements
            fieldsetEl.querySelectorAll('.bfuce-form-error').forEach((el) => el.remove());

            // Validate each field
            let formIsValid = true;
            Promise.all(getWidgetDefinition().inputFields.map(async (field) => {
                const fieldEl = fieldEls[field.key];
                const validate = field.validate || (() => true);
                try {
                    await validate.call(field, fieldEl);
                } catch (error) {
                    // Else add an error message element
                    console.log('Validation Error', error);
                    fieldEl.appendChild(htmlToElement(
                        `<div class="bfuce-form-error">* ${error.message}</div>`));
                    formIsValid = false;
                }
            })).then(() => {
                if (!formIsValid) return;

                // If all validation passed, pass each field through it's submit handler
                // and build the result object
                const result = {};
                Promise.all(getWidgetDefinition().inputFields.map(async (field) => {
                    result[field.key] = await field.submit(fieldEls[field.key]);
                })).then(() => {
                    popupEl.remove();
                    resolve(getWidgetDefinition().buildHtml(result));
                });
            });
        });

        // Show the popup!
        window.document.body.appendChild(popupEl);
    });
}

function populateForm(fieldsetEl, widgetDefinition) {
    // Clear the content
    fieldsetEl.innerHTML = '';

    // check the fields sefinitions is valid
    const fieldNames = {};
    widgetDefinition.inputFields.forEach((field) => {
        if (fieldNames[field.key]) throw new Error(`Duplicate "key" detected: "${field.key}".`);
        fieldNames[field.key] = true;
    });

    // Populate the new content

    // Title
    fieldsetEl.appendChild(htmlToElement(`<legend><h1 style="margin: 0;">${widgetDefinition.name}</h1></legend>`));

    // Input fields
    let fieldEls = {};
    widgetDefinition.inputFields.forEach((field) => {
        // create the field
        const fieldEl = field.createfieldEl();
        // save the fieldEl for later use
        fieldEls[field.key] = fieldEl;
        // add the field to the form
        fieldsetEl.appendChild(fieldEl);
    });
    return fieldEls;
}

