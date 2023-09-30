import popupHtml from './popup-form.html?raw';
import { htmlToElement } from './utils.js';

/**
 * Displays a popup form based on the plugin config to gather user input.
 * @param {object} config
 * @returns {object} - The selected widget type configuration and
 * a dictionary of the collected+validated user input data.
 */
export default async function GetUserInput (config) {
    // Display the popup form to gether user input
    let popupResult = await ShowPopup(config);

    // User canceled the popup
    if (!popupResult || !popupResult.widgetData) return null;

    // all good! return the resulting data
    return {
        widgetDefinition: popupResult.widgetDefinition,
        widgetData: popupResult.widgetData,
    };
}

async function ShowPopup (config) {

    return new Promise((resolve, reject) => {
        // Get useful elements
        const popupEl = htmlToElement(popupHtml);
        const closeEl = popupEl.querySelector('#close');
        const widgetDefinitionSelectEl = popupEl.querySelector('#widget-select');
        const fieldsetEl = popupEl.querySelector('#fieldset');
        const submitButtonEl = popupEl.querySelector('button[type="submit"]');

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
            fieldsetEl.querySelectorAll('.form-error').forEach((el) => el.remove());

            // Validate each field
            let formIsValid = true;
            Promise.all(getWidgetDefinition().inputFields.map(async (field) => {
                const fieldEl = fieldEls[field.key];
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
                Promise.all(getWidgetDefinition().inputFields.map(async (field) => {
                    result[field.key] = await field.submit(fieldEls[field.key], fieldsetEl);
                })).then((results) => {
                    console.log('submission complete', result);

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

