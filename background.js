/**
 * Get global object `browser` from Firefox API.
 */
var browser;

/**
 * Global variables.
 */
let assoc = [];

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

/**
 * Logic for tab update.
 */
function tabUpdate(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const item = assoc.find(i => tab.url.match(i.url));
        if (item) {
            browser.runtime.sendNativeMessage('open_program',
                item.command.replaceAll('$URL$', tab.url))
                .then(log)
                .catch(logError);

            if (!item.preserveTab) {
                browser.tabs.remove(tabId)
                    .then(log)
                    .catch(logError);
            }
        }
    }
}

/**
 * Logic for Option update.
 */
function optionsUpdate(changes, areaName) {
    assoc = [];
    changes.assoc.newValue.every(item => assoc.push({
        url: item.url,
        command: item.command,
        preserveTab: item.preserveTab
    }));
}

(() => {

    /**
     * Listen in to Options change.
     */
    browser.storage.onChanged.addListener(optionsUpdate)

    /**
     * Listen in to Tab changes.
     */
    browser.tabs.onUpdated.addListener(tabUpdate);

    /**
     * Init `assoc` array.
     */
    assoc = [];
    browser.storage.local.get({ 'assoc': [] })
        .then(options =>
            options.assoc.every(item => assoc.push({
                url: item.url,
                command: item.command,
                preserveTab: item.preserveTab
            })))
        .catch(logError);

    /**
     * First contact with the native helper.
     */
    browser.runtime.sendNativeMessage('open_program', 'ping')
        .then((response) => {
            log('Successfully communicate with the native helper');
            log(response);
        })
        .catch(logError);

})();
