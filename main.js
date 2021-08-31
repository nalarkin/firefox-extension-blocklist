const RESERVED_KEYWORDS = ['_HIDE', '_EXAMPLE'];
const button_type = {
    BLOCK: 'block',
    UNBLOCK: 'unblock'
};
const button_style = {
    block: 'blocklist-block-button',
    unblock: 'blocklist-unblock-button',
}

const buttons = {
    BLOCK: {
        NAME: 'BLOCK',
        CLASSNAME: 'blocklist-block-button',
    },
    UNBLOCK: {
        NAME: 'UNBLOCK',
        CLASSNAME: 'blocklist-unblock-button',
    },
}


/**
 * https:
 * @param {string} domain 
 * @returns 
 */
function domainIsBlocklisted(domain) {
    var result = localStorage.getItem(domain);
    if (result === null || result === false) {
        return false;
    }
    return true;
}

function addDomainToFilter(domain) {
    /* Callback in onclick to add given domain to the blacklist */
    console.log('adding domain ' + domain);

    if (!domainIsBlocklisted(domain) && !RESERVED_KEYWORDS.includes(domain)) {

        localStorage.setItem(domain, true);
    } else {
        console.log('item already blocklisted.');
    }
    console.log('done');
}
function toggleDomainInFilter(domain) {
    /* Callback in onclick to add given domain to the blacklist */


    if (!RESERVED_KEYWORDS.includes(domain)) {
        if (!domainIsBlocklisted(domain)) {

            localStorage.setItem(domain, true);
        } else {
            localStorage.removeItem(domain);
            console.log('removed domain from blocklist.');
        }
    }

    console.log('done');
}

function readDomainFilter(domain) {
    /* Callback in onclick to add given domain to the blacklist */
    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}

function wrapAndCollapseResult(resultNode, domain) {

    /* Wrap the blacklisted result with a <details> element so we can autocollapse it */
    let wrapper = document.createElement('details');
    wrapper.id = resultNode.id + "_wrapper";
    wrapper.classList.add('feedback-prompt');

    let filterSummary = document.createElement('summary');
    filterSummary.classList.add('blocklist-summary');
    filterSummary.textContent = "Filtered " + domain + " from results";

    wrapper.appendChild(filterSummary);
    resultNode.parentNode.insertBefore(wrapper, resultNode);

    let spacer = document.createElement('div');
    spacer.classList.add('blocklist-spacer');

    wrapper.appendChild(resultNode);

    return wrapper;


}


function getToggledButtonText(currButtonText) {
    switch (currButtonText) {
        case buttons.BLOCK.NAME:
            return buttons.UNBLOCK.NAME;

        case buttons.UNBLOCK.NAME:
            return buttons.BLOCK.NAME;
    }
}
function getButtonClassName(buttonName) {
    switch (buttonName) {
        case buttons.BLOCK.NAME:
            return buttons.BLOCK.CLASSNAME;

        case buttons.UNBLOCK.NAME:
            return buttons.UNBLOCK.CLASSNAME;
    }
}


function createToggleButton(buttonName, url) {
    console.log('createTogle2');
    console.log('buttonName= ' + buttonName);
    console.log('buttons.BLOCK.CLASSNAME = ' + buttons.BLOCK.CLASSNAME);
    let but = document.createElement('button');

    but.innerText = buttonName;
    if (domainIsBlocklisted(url)) {
        but.classList.add(buttons.UNBLOCK.CLASSNAME);
    } else {
        but.classList.add(buttons.BLOCK.CLASSNAME);
    }

    but.onclick = function () {
        console.log('you clicked the button');
        toggleDomainInFilter(url);

        var arr = but.innerText.split(' ');

        var newValue = getToggledButtonText(arr[0]);

        newStyle = getButtonClassName(newValue);



        but.classList.remove(buttons.BLOCK.CLASSNAME, buttons.UNBLOCK.CLASSNAME);
        but.classList.add(newStyle);

        but.innerText = newValue + ' ' + arr[1];


    };
    but.classList.add('feedback-prompt');

    return but;
}

function printLoaded() {
    console.log('loaded page!!')
}



/**
 * Create an observer that will observe the first element that is found
 * @param {string} query : string to uqery for
 * @returns 
 */
function createObserver(query) {
    /* Options for the observer (which mutations to observe)*/
    const config = { attributes: true, href: true };

    /* Callback function to execute when mutations are observed*/
    const callback = function (mutationsList, observer) {
        /* Use traditional 'for loops' for IE 11*/
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    };

    let resultsObserver = new MutationObserver(callback);

    /* select element to watch*/
    let resultDiv = document.querySelector(query);

    console.log(resultDiv)
    /* if any elements match the query*/
    if (resultDiv) {
        resultsObserver.observe(resultDiv, config);
    }
    return resultsObserver;
}


function insertButtonBeforeQuery(qSelector, thingToInsert) {
    let elem = document.querySelector(qSelector);
    elem.parentNode.insertBefore(thingToInsert, elem.nextSibling);
}
function insertButtonBeforeElement(elem, thingToInsert) {
    console.log('insertBeforeElement');
    elem.parentNode.insertBefore(thingToInsert, elem);
}


function addButtonsBeforeLinks() {
    /* largest container that has relevant unique url*/
    let results = document.getElementsByClassName('g');
    let arr = [];
    if (results) {
        for (const val of results) {
            /*selects all websites regardless of if they are recommending theri base page or not 
             ex. finds "msn.com > en-us > Sports" and "foxnews.com" */
            linkPart = val.querySelector('cite')
            /* handles the discrepency in the above format, selects url*/
            parsedUrl = linkPart.innerText.split(' ')[0];
            console.log(parsedUrl);


            /* remove if it matches this statement*/
            if (domainIsBlocklisted(parsedUrl)) {
                /* formatting errors caused by div: id="eob_14", very first search result is blacklisted.*/
                button = createToggleButton(buttons.UNBLOCK.NAME + ' ' + parsedUrl, parsedUrl);
                wrapper = wrapAndCollapseResult(val, parsedUrl);
                insertButtonBeforeElement(val, button);
            } else {
                button = createToggleButton(buttons.BLOCK.NAME + ' ' + parsedUrl, parsedUrl);
                insertButtonBeforeElement(val, button);
                arr.push(parsedUrl);
            }


        }

    }
    console.log(arr);
}



addButtonsBeforeLinks();
console.log('script injected');
