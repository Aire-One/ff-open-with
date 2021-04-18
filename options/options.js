'use strict';

function log(message, channel) {
    channel = channel || 'log';
    const fn = console[channel];

    if (typeof(fn) === 'function') {
        fn(message);
    }
}

function logError(error) {
    log(error, 'error');
}

function createElement(tag, classes, type) {
    const $element = document.createElement(tag);
    $element.setAttribute('class', classes);
    $element.setAttribute('type', type);

    return $element;
}

function buildAssocItem(item) {
    const $urlField = createElement('input', 'assoclist__item__url');
    const $commandField = createElement('input', 'assoclist__item__command');
    const $preservTabCheckbox = createElement('input', 'assoclist__item__preserveTab', 'checkbox');
    const $removeButton = createElement('button', 'assoclist__item__remove-btn js-removebtn');
    $removeButton.innerText = 'X';

    if (item) {
        $urlField.value = item.url;
        $commandField.value = item.command;
        $preservTabCheckbox.checked = item.preserveTab;
    }

    const $item = createElement('div', 'assoclist__item');
    $item.appendChild($urlField);
    $item.appendChild($commandField);
    $item.appendChild($preservTabCheckbox);
    $item.appendChild($removeButton);

    return $item;
}

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Load options.
     */
    (() => {
        browser.storage.local.get({ 'assoc': [] })
            .then(options =>
                options.assoc.every(item =>
                    document.querySelector('.js-assoclist')
                        .appendChild(buildAssocItem(item))))
            .catch(logError);
    })();

    /**
     * `.js-add` OnClick event.
     */
    document.querySelector('.js-add').addEventListener('click', (e) => {
        e.preventDefault();

        const $newItem = buildAssocItem();
        document.querySelector('.js-assoclist').appendChild($newItem);
    });

    /**
     * `.js-save` OnClick event.
     */
    document.querySelector('.js-save').addEventListener('click', (e) => {
        e.preventDefault();

        const data = [];
        Array.from(document.querySelector('.js-assoclist').childNodes)
            .filter(e => e.className === 'assoclist__item')
            .every(e => data.push({
                url: e.querySelector('.assoclist__item__url').value,
                command: e.querySelector('.assoclist__item__command').value,
                preserveTab: e.querySelector('.assoclist__item__preserveTab').checked
            }));

        browser.storage.local.set({ 'assoc': data })
          .then(log)
          .catch(logError);
    });

    /**
     * `.js-removebtn` OnClick event.
     */
    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('js-removebtn')) {
            e.preventDefault();
            target.closest('.assoclist__item').remove();
        }
    })

});
