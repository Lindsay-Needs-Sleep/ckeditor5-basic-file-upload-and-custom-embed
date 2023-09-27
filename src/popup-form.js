import popupHtml from './popup-form.html?raw';

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

export default async function ShowPopup () {
    return new Promise((resolve, reject) => {
        // Get useful elements
        const popupEl = htmlToElement(popupHtml);
        const closeEl = popupEl.querySelector('#close');
        const injectionTypeEl = popupEl.querySelector('#injection-type');
        const contentEl = popupEl.querySelector('#content');

        // Populate data

        // Add event listeners
        closeEl.addEventListener('click', () => {
            popupEl.remove();
            resolve(null);
        });
        injectionTypeEl.addEventListener('change', console.log);
        // (e) => {
        //     console.log('injectionTypeEl change', e);
        // });

        console.log('ShowPopup', popupHtml, popupEl);

        // Show the popup!
        window.document.body.appendChild(popupEl);
    });
}
